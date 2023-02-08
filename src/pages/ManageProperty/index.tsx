import * as _ from 'lodash';
import type { FC } from 'react';
import { findDOMNode } from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import {
  Table,
  Card,
  Button,
  Form,
  Space,
  Modal,
  Spin,
  Divider,
  Input,
  Select
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { PropertyData, Property } from './data';
import AddPropertyModal from './components/AddPropertyModal';
import UploadPropertyImageModal from './components/UploadPropertyImageModal';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

interface PropertyProps {
  key: string;
  _id: string;
  type: string;
  isNew?: boolean;
  editable?: boolean;
  dispatch: Dispatch<any>;
  submitting: boolean;
  propertyManager: PropertyData;
}

export const ManageProperty: FC<PropertyProps> = (props) => {
  const { dispatch, propertyManager} = props;
  const { propertyData } = propertyManager;
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleAddPropertyModal, setVisibleAddPropertyModal] = useState<boolean>(false);
  const [visibleUploadImageModal, setVisibleUploadImageModal] = useState<boolean>(false);
  const [propertyId, setPropertyId] = useState('');
  const [clickedCancel, setClickedCancel] = useState(false);
  const [index, setIndex] = useState(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [data, setData] = useState<Partial<Property> | undefined>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'propertyManager/loadInitialData',
      });
    }
    if (typeof propertyManager === 'undefined') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: 'propertyManager/loadInitialData'
    })
    if (typeof propertyManager === 'undefined') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [refresh])

  useEffect(() => {
    const data: Property[] = [];
    propertyData?.map((property_data) => {
      data.push(
        {
          key: property_data._id,
          _id: property_data._id,
          title: property_data.title,
          slug: property_data.slug,
          location: property_data.location,
          description: property_data.description,
          price: property_data.price,
          type: property_data.type,
          status: property_data.status,
          area: property_data.area,
          property_image: property_data.property_image
        }
      )
    })

    setData(data)
  }, [propertyData])

  const addBtn = useRef(null);
  const setAddBtnblur = () => {
    if (addBtn.current) {
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const showModalAddProperty = () => {
    setAddBtnblur();
    setVisibleAddPropertyModal(true);
  };

  const handleDoneAddPropertyModal = () => {
    setAddBtnblur();
    setVisibleAddPropertyModal(false);
  };

  const handleCancelAddPropertyModal = () => {
    setAddBtnblur();
    setVisibleAddPropertyModal(false);
  };

  const showModalUploadImage = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    setAddBtnblur();
    setVisibleUploadImageModal(true);
    setPropertyId(key)
  }

  const handleDoneUploadImageModal = () => {
    setAddBtnblur();
    setVisibleUploadImageModal(false);
  };

  const handleCancelUploadImageModal = () => {
    setAddBtnblur();
    setVisibleUploadImageModal(false);
  };

  const handleSubmitAddPropertyModal = (values: Property) => {
    setAddBtnblur();
    dispatch({
      type: 'propertyManager/createProperty',
      payload: {
        title: values.title,
        slug: values.slug,
        location: values.location,
        description: values.description,
        price: Number(values.price),
        type: values.type,
        status: values.status,
        area: Number(values.area)
      }
    });

    dispatch({
      type: 'propertyManager/loadInitialData'
    })
    setVisibleAddPropertyModal(false)
    setRefresh(!refresh)
  };

  const handleSubmitUploadImageModal = (values: Property) => {
    setAddBtnblur();
    if(values.upload_image.length > 0) {
      const formData = new FormData()  
      formData.append("file", values.upload_image[0].originFileObj)

      setAddBtnblur();
      dispatch({
        type: 'propertyManager/uploadImage',
        payload: formData,
        property_id: propertyId
      });
      dispatch({
        type: 'propertyManager/loadInitialData'
      })
      setRefresh(!refresh)
      setVisibleUploadImageModal(false)
    } else {
      setVisibleUploadImageModal(false)
    }
  };

  const deleteItem = (propertyData: Property) => {
    dispatch({
      type: 'propertyManager/deleteProperty',
      property_id: propertyData._id
    });
    dispatch({
      type: 'propertyManager/loadInitialData',
    });
    setRefresh(!refresh)
  };

  const getRowByKey = (key: string, newData?: PropertyProps[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

  const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.preventDefault();
    const newData = data?.map((item) => ({ ...item }));
    const target = getRowByKey(key, newData);

    if (target) {
      // Save the original data when entering the editing state
      if (!target.editable) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.editable = !target.editable;
      setIndex(index);
      setData(newData);
    }
  };

  const handleEditFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as PropertyProps[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const handleOptionChange = (
    e: SelectValue,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as PropertyProps[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e;
      setData(newData);
    }
  };

  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    if (clickedCancel) {
      setClickedCancel(false);
      return;
    }

    let submitObj = {};
    data?.map((select_data) => {
      if (select_data._id === key) {
        submitObj = select_data
      }
    })

    dispatch({
      type: 'propertyManager/updateProperty',
      payload: { property: submitObj },
      property_id: key
    });
    dispatch({
      type: 'propertyManager/loadInitialData'
    })
    setRefresh(!refresh)
    toggleEditable(e, key);
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const cancel = (e: React.MouseEvent, key: string) => {
    setClickedCancel(true);
    e.preventDefault();
    const newData = [...(data as PropertyProps[])];
    // Original data before editing
    let cacheData = [];
    cacheData = newData.map((item) => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...cacheOriginData[key],
            editable: false,
          };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setClickedCancel(false);
  };

  const columns = [
    {
      title: 'Property ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Property Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Input
              key={title}
              value={title}
              autoFocus
              onChange={(e) => handleEditFieldChange(e, 'title', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
            />
          );
        }
        return title
      },
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Input
              key={slug}
              value={slug}
              autoFocus
              onChange={(e) => handleEditFieldChange(e, 'slug', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
            />
          );
        }
        return slug
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Input
              key={location}
              value={location}
              autoFocus
              onChange={(e) => handleEditFieldChange(e, 'location', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
            />
          );
        }
        return location
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Input
              key={description}
              value={description}
              autoFocus
              onChange={(e) => handleEditFieldChange(e, 'description', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
            />
          );
        }
        return description.substring(3,10)
      },
    },
    {
      title: 'Price(LKR)',
      dataIndex: 'price',
      key: 'price',
      render: (price: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Input
              key={price}
              value={price}
              autoFocus
              onChange={(e) => handleEditFieldChange(e, 'price', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
            />
          );
        }
        return price
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Select
              style={{ width: 100 }}
              onChange={(e) => handleOptionChange(e, 'type', record.key)}
            >
              {(['Single', 'Family', 'Villa']).map((type_data) => (
                <Option key={type_data} value={type_data}>
                  {type_data}
                </Option>
              ))}
            </Select>
          );
        }
        return type
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Select
              style={{ width: 100 }}
              onChange={(e) => handleOptionChange(e, 'status', record.key)}
            >
              {(['For Sale', 'For Rent']).map((status_data) => (
                <Option key={status_data} value={status_data}>
                  {status_data}
                </Option>
              ))}
            </Select>
          );
        }
        return status
      },
    },
    {
      title: 'Area(Sq Ft)',
      dataIndex: 'area',
      key: 'area',
      render: (area: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Input
              key={area}
              value={area}
              autoFocus
              onChange={(e) => handleEditFieldChange(e, 'area', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
            />
          );
        }
        return area
      },
    },
    {
      title: 'Property Image',
      dataIndex: 'property_image',
      key: 'property_image',
      render: (property_image: string, record: PropertyProps) => {
        if (record.editable) {
          return (
            <Input
              key={property_image}
              value={property_image}
              autoFocus
              onChange={(e) => handleEditFieldChange(e, 'property_image', record.key)}
              onKeyPress={(e) => handleKeyPress(e, record.key)}
            />
          );
        }
        return <img src={property_image} alt="property" width={60} height={60} />
      },
    },
    {
      title: 'Action',
      dataIndex: 'option',
      width: '20%',
      valueType: 'option',
      render: (_: string, record: PropertyProps) => {
        if (!!record.editable && loading) {
          return null;
        }
        if (record.editable) {
          return (
            <span>
              <Button onClick={(e) => saveRow(e, record.key)}>Save</Button>
              <Divider type="vertical" />
              <Button onClick={(e) => cancel(e, record.key)}>Cancel</Button>
            </span>
          );
        }
        return (
          <Space>
            <Button onClick={(e) => toggleEditable(e, record.key)}>Edit</Button>
            <Button onClick={(e) => showModalUploadImage(e, record.key)}>Upload Image</Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                Modal.confirm({
                  title: 'Delete',
                  content: 'Are you sure you want to remove this property ?',
                  okText: 'Ok',
                  cancelText: 'Cancel',
                  onOk: () => deleteItem(record),
                });
              }}
              danger
            >
              Delete
            </Button>
          </Space>
        );
      },
    }
  ];

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'propertyManager/loadInitialData',
      });
    }
  }, []);

  return (
    <PageContainer>
      <Spin spinning={loading}>
        <Form>
          <Card
            title="Property Details"
            extra={
              <Button type="primary" onClick={() => showModalAddProperty()}>
                <PlusOutlined />
                Add Property
              </Button>
            }
            style={{ marginBottom: 24 }}
          >
            <Table
              rowKey="_id"
              pagination={{
                pageSizeOptions: ['10', '20', '50', '100', '1000'],
                showSizeChanger: true,
                locale: { items_per_page: '/Page' },
              }}
              dataSource={data}
              columns={columns}
            />
          </Card>
          <AddPropertyModal
            visible={visibleAddPropertyModal}
            onDone={handleDoneAddPropertyModal}
            onCancel={handleCancelAddPropertyModal}
            onSubmit={handleSubmitAddPropertyModal}
          />
          <UploadPropertyImageModal
            visible={visibleUploadImageModal}
            onDone={handleDoneUploadImageModal}
            onCancel={handleCancelUploadImageModal}
            onSubmit={handleSubmitUploadImageModal}
          />
        </Form>
      </Spin>
    </PageContainer>
  );
};

export default connect(
  ({
    propertyManager,
    loading,
  }: {
    propertyManager: any;
    loading: { effects: Record<string, boolean> };
    pageLoading: { effects: Record<string, boolean> };
  }) => ({
    propertyManager,
    pageLoading: loading.effects['propertyManager/loadInitialData'],
  }),
)(ManageProperty);

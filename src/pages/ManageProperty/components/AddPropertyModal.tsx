import type { FC } from 'react';
import { Modal, Input, Form, Select } from 'antd';
import styles from '../style.less';
import { Property } from '../data';

const { Option } = Select;
const { TextArea } = Input

interface AddPropertyModalProps {
  visible: boolean;
  onDone: () => void;
  onCancel: () => void;
  onSubmit: (values: Property) => void;
}

const AddPropertyModal: FC<AddPropertyModalProps> = (props) => {
  const [formAddProperty] = Form.useForm();
  const { visible, onCancel, onSubmit } = props;

  const handleSubmit = () => {
    if (!formAddProperty) return;
    formAddProperty.submit();
  };

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      onSubmit(values as Property);
      formAddProperty.resetFields();
    }
  };

  const modalFooter = { okText: 'Add', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    return (
      <Form
        form={formAddProperty}
        name="formAddProperty"
        onFinish={handleFinish}
        style={{ padding: "0px 40px 10px 40px" }}
      >
        <Form.Item
          label="Property Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          rules={[
            {
              required: true,
              message: "Please enter slug",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Property Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please enter location",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Price(LKR)"
          name="price"
          rules={[
            {
              required: true,
              pattern: /^\d+\.?\d*$/,
              message: 'please enter only numbers',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please enter type",
            },
          ]}
        >
          <Select
            style={{ width: 200 }}
          >
            {(['Single', 'Family', 'Villa']).map((type_data) => (
              <Option key={type_data} value={type_data}>
                {type_data}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: "Please enter status",
            },
          ]}
        >
          <Select
            style={{ width: 200 }}
          >
            {(['For Sale', 'For Rent']).map((status_data) => (
              <Option key={status_data} value={status_data}>
                {status_data}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Area(Sq Ft)"
          name="area"
          rules={[
            {
              required: true,
              pattern: /^\d+\.?\d*$/,
              message: 'please enter only numbers',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title='Add Property'
      className={styles.standardListForm}
      bodyStyle={{ padding: '28px 0 0' }}
      destroyOnClose
      width={800}
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default AddPropertyModal;

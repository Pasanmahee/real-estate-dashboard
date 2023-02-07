import type { FC } from 'react';
import { useState } from 'react';
import { Modal, Form} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import styles from '../style.less';
import ImageUpload from './ImageUpload';
import { Property } from '../data';

interface UploadPropertyImageModalProps {
  visible: boolean;
  onDone: () => void;
  onCancel: () => void;
  onSubmit: (values: Property) => void;
}

const UploadPropertyImageModal: FC<UploadPropertyImageModalProps> = (props) => {
  const [formUploadPropertyImage] = Form.useForm();
  const { visible, onCancel, onSubmit } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = () => {
    if (!formUploadPropertyImage) return;
    formUploadPropertyImage.submit();
  };

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      values.upload_image = fileList
      onSubmit(values as Property);
      formUploadPropertyImage.resetFields();
    }
  };

  const modalFooter = { okText: 'Add', onOk: handleSubmit, onCancel };

  const handleImageUpload = (values: any) => {
    setFileList(values)
  }

  const getModalContent = () => {
    return (
      <Form
        form={formUploadPropertyImage}
        name="formUploadPropertyImage"
        onFinish={handleFinish}
        style={{ padding: "0px 40px 10px 40px" }}
      >
        <ImageUpload
          imageUpload={handleImageUpload}
        />
      </Form>
    );
  };

  return (
    <Modal
      title='Upload Property Image'
      className={styles.standardListForm}
      bodyStyle={{ padding: '28px 0 0' }}
      destroyOnClose
      width={600}
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default UploadPropertyImageModal;

import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

interface ImageUploadProps {
  imageUpload: (values: any) => void;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const { imageUpload } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
   const filteredFileList = newFileList?.filter((file_list_data) => {
    if( file_list_data.originFileObj?.type === "image/png" || file_list_data.originFileObj?.type === "image/svg+xml" || file_list_data.originFileObj?.type === "image/jpg") {
    } else {
      message.warning("png, jpg and svg only")
    }
    return file_list_data.originFileObj?.type === "image/png" || file_list_data.originFileObj?.type === "image/svg+xml" || file_list_data.originFileObj?.type === "image/png"
   })

    setFileList(filteredFileList);
    imageUpload(filteredFileList)
  }
    
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
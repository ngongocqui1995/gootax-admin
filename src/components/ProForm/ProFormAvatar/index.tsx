import { uploadImage } from '@/components/ProForm/ProFormAvatar/services';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, ColProps, Form, Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styles from './styles.less';
// @ts-ignore
import { useIntl } from '@umijs/max';
import ImgCrop from 'antd-img-crop';
import sizeOf from 'image-size';

interface ProFormAvatarProps {
  name?: string;
  label?: string;
  ref?: any;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  folder?: string;
}

const ProFormAvatar: React.FC<ProFormAvatarProps> = forwardRef(
  ({ name, label, labelCol, wrapperCol, folder }, ref) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 1, height: 1 });
    const intl = useIntl();

    useImperativeHandle(ref, () => ({
      setImageUrl,
      getImageUrl: () => imageUrl,
    }));

    const beforeUpload = async (file: any) => {
      const isImage = !!file.type.match(/(jpg|jpeg|png|gif)/);
      if (!isImage) {
        message.error(
          intl.formatMessage({
            id: 'pages.ProForm.Avatar.errors.type',
            defaultMessage: 'Bạn chỉ có thể up lên file JPG/PNG/JPEG/GIF!',
          }),
        );
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error(
          intl.formatMessage({
            id: 'pages.ProForm.Avatar.errors.size',
            defaultMessage: 'Ảnh phải có kích thước nhở 5MB!',
          }),
        );
      }

      if (isImage && isLt5M) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder || '');
        const data = await uploadImage(formData);
        setImageUrl(data?.link || '');
      }
    };

    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        setLoading(false);
        return;
      }
    };

    return (
      <Form.Item
        name={name || 'avatar'}
        label={
          label || intl.formatMessage({ id: 'pages.ProForm.Avatar.title', defaultMessage: 'Ảnh' })
        }
        className={styles.avatarCustom}
        labelCol={labelCol || { span: 10 }}
        wrapperCol={wrapperCol || { span: 10 }}
      >
        <ImgCrop
          rotate
          modalTitle={intl.formatMessage({
            id: 'pages.ProForm.Avatar.Update.title',
            defaultMessage: 'Chỉnh sửa ảnh',
          })}
          modalOk={intl.formatMessage({ id: 'pages.OK', defaultMessage: 'Đồng ý' })}
          modalCancel={intl.formatMessage({ id: 'pages.Cancel', defaultMessage: 'Huỷ' })}
          aspect={dimensions.width / dimensions.height}
          // @ts-ignore
          beforeCrop={async (file) => {
            const { width, height } = sizeOf(Buffer.from(await file.arrayBuffer()));
            setDimensions({ width: width || 1, height: height || 1 });

            return true;
          }}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className={`avatar-uploader`}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <Card size="small">
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              </Card>
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </ImgCrop>
      </Form.Item>
    );
  },
);

export default ProFormAvatar;

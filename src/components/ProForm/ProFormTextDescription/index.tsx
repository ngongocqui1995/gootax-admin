import { ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';
// @ts-ignore
import { useIntl } from '@umijs/max';
import { ColProps } from 'antd';

interface ProFormTextDescriptionProps {
  name?: string;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
}

const ProFormTextDescription: React.FC<ProFormTextDescriptionProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormTextArea
      name="description"
      label={intl.formatMessage({ id: 'pages.description', defaultMessage: 'Mô tả' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.description.required',
            defaultMessage: 'Mô tả là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({
        id: 'pages.description.placeholder',
        defaultMessage: 'Nhập mô tả',
      })}
      {...props}
    />
  );
};

export default ProFormTextDescription;

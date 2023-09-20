import { ProFormText } from '@ant-design/pro-form';
import React from 'react';
// @ts-ignore
import { useIntl } from '@umijs/max';

interface ProFormTextUrlProps {
  name?: string;
  label?: string;
}

const ProFormTextUrl: React.FC<ProFormTextUrlProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name={props.name || 'url'}
      label={intl.formatMessage({ id: 'pages.url', defaultMessage: 'Url' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.url.required',
            defaultMessage: 'Url là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({ id: 'pages.url.placeholder', defaultMessage: 'Nhập url' })}
      {...props}
    />
  );
};

export default ProFormTextUrl;

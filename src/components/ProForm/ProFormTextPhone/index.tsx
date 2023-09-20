import { invalidPhoneProvider, regPhoneNumber } from '@/utils/utils';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';
// @ts-ignore
import { useIntl } from '@umijs/max';

const ProFormTextPhone: React.FC = (props) => {
  const intl = useIntl();

  return (
    <ProFormText
      name="phone"
      label={intl.formatMessage({ id: 'pages.phone', defaultMessage: 'Số điện thoại' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.phone.required',
            defaultMessage: 'Số điện thoại là bắt buộc!',
          }),
        },
        {
          validator: (rule: any, value: any, callback: (error?: string) => void) => {
            const reg = new RegExp(regPhoneNumber, 'i');
            if (!reg.test(value))
              return callback(
                intl.formatMessage({
                  id: 'pages.ProForm.TextPhone.errors.invalid',
                  defaultMessage: 'Số điện thoại không đúng định dạng!',
                }),
              );
            if (value.length >= 2 && invalidPhoneProvider(value))
              return callback(
                intl.formatMessage({
                  id: 'pages.ProForm.TextPhone.errors.network',
                  defaultMessage: 'Số điện thoại không thuộc nhà mạng Việt Nam!',
                }),
              );
            return callback();
          },
        },
      ]}
      placeholder={intl.formatMessage({
        id: 'pages.phone.placeholder',
        defaultMessage: 'Nhập số điện thoại',
      })}
      {...props}
    />
  );
};

export default ProFormTextPhone;

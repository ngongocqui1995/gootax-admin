import { ProFormDigit } from '@ant-design/pro-form';
import { ColProps } from 'antd';
// @ts-ignore
import { useIntl } from '@umijs/max';

interface ProFormDigitProps {
  name?: string;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
}

const ProFormQuantity: React.FC<ProFormDigitProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormDigit
      name="discount"
      label={intl.formatMessage({ id: 'pages.discount', defaultMessage: 'Giảm giá' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.discount.required',
            defaultMessage: 'Giảm giá là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({
        id: 'pages.discount.placeholder',
        defaultMessage: 'Nhập giảm giá',
      })}
      fieldProps={{ formatter: (value) => `${value || 0}%` }}
      {...props}
    />
  );
};

export default ProFormQuantity;

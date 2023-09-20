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
      name="quantity"
      label={intl.formatMessage({ id: 'pages.quantity', defaultMessage: 'Số lượng' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.quantity.required',
            defaultMessage: 'Số lượng là bắt buộc!',
          }),
        },
      ]}
      placeholder={intl.formatMessage({
        id: 'pages.quantity.placeholder',
        defaultMessage: 'Nhập số lượng',
      })}
      {...props}
    />
  );
};

export default ProFormQuantity;

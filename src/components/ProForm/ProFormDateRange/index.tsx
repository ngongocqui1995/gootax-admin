import { ProFormDateTimeRangePicker } from '@ant-design/pro-form';
import { ColProps } from 'antd';
import moment from 'moment';
// @ts-ignore
import { useIntl } from '@umijs/max';

interface ProFormDateRangeProps {
  name?: string;
  wrapperCol?: ColProps;
  labelCol?: ColProps;
}

const ProFormDateRange: React.FC<ProFormDateRangeProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormDateTimeRangePicker
      name="display_date"
      label={intl.formatMessage({ id: 'pages.display_date', defaultMessage: 'Ngày diễn ra' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.display_date.required',
            defaultMessage: 'Ngày diễn ra là bắt buộc!',
          }),
        },
      ]}
      fieldProps={{
        showTime: {
          showHour: true,
          defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')],
        },
      }}
      placeholder={[
        intl.formatMessage({
          id: 'pages.date.from.placeholder',
          defaultMessage: 'Từ',
        }),
        intl.formatMessage({
          id: 'pages.date.to.placeholder',
          defaultMessage: 'Đến',
        }),
      ]}
      {...props}
    />
  );
};

export default ProFormDateRange;

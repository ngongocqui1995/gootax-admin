import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryTypeCars } from '@/pages/Device/TypeCar/service';
import { I_TYPE_FORM } from '@/utils/interface';
import { useIntl } from '@umijs/max';

interface ProFormSelectTypeCarProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectTypeCar: React.FC<ProFormSelectTypeCarProps> = (props) => {
  const intl = useIntl();

  return (
    <ProSelectLoadMore
      name="type_car"
      label={intl.formatMessage({ id: 'pages.type', defaultMessage: 'Loại' })}
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.type.required',
            defaultMessage: 'Loại là bắt buộc!',
          }),
        },
      ]}
      showSearch
      requestLoadMore={queryTypeCars}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.type.placeholder',
          defaultMessage: 'Chọn loại.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectTypeCar;

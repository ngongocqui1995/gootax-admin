import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryCarStyles } from '@/pages/Device/CarStyle/service';
import { I_TYPE_FORM } from '@/utils/interface';

interface ProFormSelectCarStyleProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectCarStyle: React.FC<ProFormSelectCarStyleProps> = (props) => {
  return (
    <ProSelectLoadMore
      name="car_style"
      label="Kiểu dáng xe"
      rules={[
        {
          required: true,
          message: 'Kiểu dáng xe là bắt buộc!',
        },
      ]}
      showSearch
      requestLoadMore={queryCarStyles}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: 'Chọn kiểu dáng xe.',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectCarStyle;

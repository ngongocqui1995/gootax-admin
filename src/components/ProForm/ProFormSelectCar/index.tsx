import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryCars } from '@/pages/Device/Car/service';
import { I_TYPE_FORM } from '@/utils/interface';

interface ProFormSelectCarProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectCar: React.FC<ProFormSelectCarProps> = (props) => {
  return (
    <ProSelectLoadMore
      name="car"
      label="Xe"
      rules={[
        {
          required: true,
          message: 'Xe là bắt buộc!',
        },
      ]}
      showSearch
      requestLoadMore={queryCars}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name, item: it }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: 'Chọn xe.',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectCar;

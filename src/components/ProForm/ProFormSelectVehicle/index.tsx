import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryVehicles } from '@/pages/Device/Vehicle/service';
import { I_TYPE_FORM } from '@/utils/interface';

interface ProFormSelectVehicleProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectVehicle: React.FC<ProFormSelectVehicleProps> = (props) => {
  return (
    <ProSelectLoadMore
      name="vehicle"
      label="Dòng xe"
      rules={[
        {
          required: true,
          message: 'Dòng xe là bắt buộc!',
        },
      ]}
      showSearch
      requestLoadMore={queryVehicles}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: 'Chọn dòng xe.',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectVehicle;

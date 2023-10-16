import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryWards } from '@/pages/Area/Ward/service';
import { I_TYPE_FORM } from '@/utils/interface';
import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';

interface ProFormSelectWardProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectWard: React.FC<ProFormSelectWardProps> = (props) => {
  return (
    <ProSelectLoadMore
      name="ward"
      label="Chọn phường/xã"
      showSearch
      rules={[
        {
          required: true,
          message: 'Phường/Xã là bắt buộc!',
        },
      ]}
      requestLoadMore={queryWards}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: 'Chọn phường/xã',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectWard;

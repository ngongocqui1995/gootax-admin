import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryDistricts } from '@/pages/Area/District/service';
import { I_TYPE_FORM } from '@/utils/interface';
import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';

interface ProFormSelectDistrictProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectDistrict: React.FC<ProFormSelectDistrictProps> = (props) => {
  return (
    <ProSelectLoadMore
      name="district"
      label="Chọn quận/huyện"
      showSearch
      rules={[
        {
          required: true,
          message: 'Quận/Huyện là bắt buộc!',
        },
      ]}
      requestLoadMore={queryDistricts}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: 'Chọn quận/huyện',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectDistrict;

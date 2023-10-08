import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryProvinces } from '@/pages/Area/Province/service';
import { I_TYPE_FORM } from '@/utils/interface';
import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';

interface ProFormSelectProvinceProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectProvince: React.FC<ProFormSelectProvinceProps> = (props) => {
  return (
    <ProSelectLoadMore
      name="province"
      label="Chọn Tỉnh/Thành phố"
      showSearch
      rules={[
        {
          required: true,
          message: 'Tỉnh/Thành phố là bắt buộc!',
        },
      ]}
      requestLoadMore={queryProvinces}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: 'Chọn tỉnh/thành phố',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectProvince;

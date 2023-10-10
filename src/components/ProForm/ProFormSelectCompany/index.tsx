import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryCompany } from '@/pages/Device/Company/service';
import { I_TYPE_FORM } from '@/utils/interface';

interface ProFormSelectCompanyProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectCompany: React.FC<ProFormSelectCompanyProps> = (props) => {
  return (
    <ProSelectLoadMore
      name="company"
      label="Hãng xe"
      rules={[
        {
          required: true,
          message: 'Hãng xe là bắt buộc!',
        },
      ]}
      showSearch
      requestLoadMore={queryCompany}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: 'Chọn hãng xe.',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectCompany;

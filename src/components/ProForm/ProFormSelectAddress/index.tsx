import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import { findGoogleMapsAPI } from './service';

const ProFormSelectAddress: React.FC<ProFormSelectProps> = (props) => {
  return (
    <ProFormSelect
      name="menu"
      label="Địa chỉ"
      showSearch
      rules={[
        {
          required: true,
          message: 'Địa chỉ là bắt buộc!',
        },
      ]}
      debounceTime={1000}
      request={async (params) => {
        if (
          !params?.keyWords ||
          !params.province ||
          !params.district ||
          !params.ward ||
          !params.road
        )
          return [];

        const res = await findGoogleMapsAPI(
          `${params.keyWords} ${params.road}, ${params.ward}, ${params.district}, ${params.province}, Việt Nam`,
        );
        return res?.map((it: any) => ({
          value: `${it.place_id}`,
          label: it.formatted_address,
          item: it,
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: 'Chọn địa chỉ.',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectAddress;

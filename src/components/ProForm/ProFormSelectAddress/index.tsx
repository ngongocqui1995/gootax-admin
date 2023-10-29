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
      request={async (params) => {
        if (!params?.keyWords || params?.keyWords === '') return [];

        const province = params?.province ? `, ${params?.province}` : '';
        const district = params?.district ? `, ${params?.district}` : '';
        const ward = params?.ward ? `, ${params?.ward}` : '';
        const road = params?.road ? ` ${params?.road}` : '';
        const res = await findGoogleMapsAPI(
          `${params.keyWords}${road}${ward}${district}${province}`,
        );
        return res?.map((it: any) => ({
          value: it.place_id,
          label: it.formatted_address,
          item: it,
        }));
      }}
      {...props}
      params={{ ...props.params }}
      fieldProps={{
        placeholder: 'Chọn địa chỉ.',
        ...props.fieldProps,
        filterOption: false,
      }}
    />
  );
};

export default ProFormSelectAddress;

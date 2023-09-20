import { statusEnum } from '@/utils/utils.enum';
import { ProFormSelect } from '@ant-design/pro-form';
import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import { getAllPermissions } from '@/pages/Admin/Permission/service';
import { useIntl } from '@umijs/max';

const ProFormSelectPermission: React.FC<ProFormSelectProps> = (props) => {
  const intl = useIntl();

  return (
    <ProFormSelect
      name="permissions"
      label={intl.formatMessage({ id: 'pages.permission', defaultMessage: 'Permission' })}
      showSearch
      rules={[
        {
          required: true,
          message: intl.formatMessage({
            id: 'pages.permission.required',
            defaultMessage: 'Permission là bắt buộc!',
          }),
        },
      ]}
      request={async (params) => {
        const res = await getAllPermissions({
          ...params,
          status: statusEnum.ACTIVE.key,
          keyword: params.keyWords,
          keyWords: undefined,
        });
        if (!res) return [];
        return res?.map((it) => ({ value: `${it.id}`, label: it.name }));
      }}
      {...props}
      mode="multiple"
      params={{ ...props.params }}
      fieldProps={{
        placeholder: intl.formatMessage({
          id: 'pages.permission.placeholder',
          defaultMessage: 'Chọn permission.',
        }),
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectPermission;

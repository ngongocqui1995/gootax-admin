import { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import React from 'react';
// @ts-ignore
import ProSelectLoadMore from '@/components/ProSelectLoadMore';
import { queryRoads } from '@/pages/Area/Road/service';
import { I_TYPE_FORM } from '@/utils/interface';
import { TYPE_FORM, statusEnum } from '@/utils/utils.enum';

interface ProFormSelectRoadProps extends ProFormSelectProps {
  defaultOptions?: { value: string; label: string }[];
  type?: I_TYPE_FORM;
}

const ProFormSelectRoad: React.FC<ProFormSelectRoadProps> = (props) => {
  return (
    <ProSelectLoadMore
      name="Road"
      label="Chọn đường"
      showSearch
      rules={[
        {
          // required: true,
          message: 'Đường là bắt buộc!',
        },
      ]}
      requestLoadMore={queryRoads}
      dataFilter={(data) => data.map((it) => ({ value: it?.id, label: it?.name }))}
      {...props}
      defaultOptions={
        [TYPE_FORM.COPY, TYPE_FORM.UPDATE].includes(props.type) ? props.defaultOptions : []
      }
      params={{ ...props.params, status: statusEnum.ACTIVE.key }}
      fieldProps={{
        placeholder: 'Chọn đường',
        ...props.fieldProps,
      }}
    />
  );
};

export default ProFormSelectRoad;

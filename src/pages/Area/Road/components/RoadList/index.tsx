import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getStatusEnum,
  getUpdatePasswordTooltip,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { CopyTwoTone, EditTwoTone, LockOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import Access from '@/components/Access';
import { SelectDistrict, SelectProvince, SelectWard } from '@/components/ProForm';
import { TYPE_FORM } from '@/utils/utils.enum';
import { ProFormDependency } from '@ant-design/pro-components';
import { useDispatch, useIntl } from '@umijs/max';
import { Tag, Tooltip } from 'antd';
import { RoadItem } from '../../data';
import { queryRoads } from '../../service';
import ChangeStatusRoad from './components/ChangeStatusRoad';
import CreateRoad from './components/ToolBar/CreateRoad';

const RoadList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'road/updateRoadList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<RoadItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Area.Road.RoadList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Area.Road.RoadList.placeholder',
          defaultMessage: 'Nhập mã, tên.',
        }),
      },
    },
    {
      title: 'Tỉnh/Thành phố',
      dataIndex: ['province', 'name'],
      key: 'province',
      width: 150,
      fieldProps: { placeholder: 'Chọn tỉnh/thành phố' },
      renderFormItem: (_, __, form) => {
        return (
          <SelectProvince
            noStyle
            rules={[]}
            fieldProps={{
              onChange: () => {
                form.setFieldsValue({ district: undefined, ward: undefined });
              },
            }}
          />
        );
      },
      valueType: 'select',
    },
    {
      title: 'Quận/Huyện',
      dataIndex: ['district', 'name'],
      key: 'district',
      width: 150,
      fieldProps: { placeholder: 'Chọn quận/huyện' },
      renderFormItem: (_, __, form) => {
        return (
          <ProFormDependency name={['province']}>
            {({ province }) => (
              <SelectDistrict
                params={{ province }}
                noStyle
                rules={[]}
                fieldProps={{
                  onChange: () => {
                    form.setFieldsValue({ ward: undefined });
                  },
                }}
              />
            )}
          </ProFormDependency>
        );
      },
      valueType: 'select',
    },
    {
      title: 'Phường/Xã',
      dataIndex: ['ward', 'name'],
      key: 'ward',
      width: 150,
      fieldProps: { placeholder: 'Chọn phường/xã' },
      renderFormItem: () => {
        return (
          <ProFormDependency name={['province', 'district']}>
            {({ province, district }) => (
              <SelectWard params={{ province, district }} noStyle rules={[]} />
            )}
          </ProFormDependency>
        );
      },
      valueType: 'select',
    },
    {
      title: 'Mã phường/xã',
      dataIndex: 'code',
      width: 120,
      search: false,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
    },
    {
      title: 'Tên phường/xã',
      dataIndex: 'name',
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.createdAt', defaultMessage: 'Ngày tạo' }),
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.updatedAt', defaultMessage: 'Ngày cập nhật' }),
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      width: 150,
      search: false,
      sorter: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.status', defaultMessage: 'Trạng thái' }),
      dataIndex: 'status',
      width: 100,
      renderText: (dom, record: RoadItem) => {
        return <ChangeStatusRoad status={dom} record={record} />;
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.status.placeholder',
          defaultMessage: 'Chọn trạng thái.',
        }),
      },
      valueType: 'select',
      valueEnum: getStatusEnum(),
      hideInTable: !access.accessible([TYPE_FORM.UPDATE_STATUS]),
    },
    {
      title: intl.formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.accessible([TYPE_FORM.UPDATE, TYPE_FORM.COPY]),
      render: (_, record) => [
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE])}`}
          key="update-road"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'road/updateRoadForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-road"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'road/updateRoadForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE_PASSWORD])}`}
          key="change-password-road"
          title={getUpdatePasswordTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'road/updateRoadForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE_PASSWORD },
              });
            }}
          >
            <LockOutlined style={{ fontSize: '16px', color: 'red' }} />
          </a>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<RoadItem>
        headerTitle={intl.formatMessage({
          id: 'pages.Area.Road.RoadList.headerTitle',
          defaultMessage: 'Danh sách đường',
        })}
        search={{
          layout: 'vertical',
        }}
        actionRef={actionRef}
        rowKey="id"
        sticky={true}
        pagination={{ ...PAGINATE_OPTIONS }}
        request={async (params, sort, filter) => {
          return await queryRoads(params, sort, filter);
        }}
        toolBarRender={() => [<CreateRoad key="create-road" />]}
        columns={columns}
        scroll={scrollTable}
      />
    </div>
  );
};

export default RoadList;

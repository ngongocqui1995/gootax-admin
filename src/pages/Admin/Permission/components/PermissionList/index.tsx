import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getStatusEnum,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { CopyTwoTone, EditTwoTone } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Tag, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import Access from '@/components/Access';
import ChangeStatusPermission from '@/pages/Admin/Permission/components/PermissionList/components/ChangeStatusPermission';
import CreatePermission from '@/pages/Admin/Permission/components/PermissionList/components/ToolBar/CreatePermission';
import { PermissionItem } from '@/pages/Admin/Permission/data';
import { queryPermissions } from '@/pages/Admin/Permission/service';
import { TYPE_FORM } from '@/utils/utils.enum';
import { useDispatch, useIntl } from '@umijs/max';

const PermissionList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'permission/updatePermissionList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<PermissionItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.Permission.PermissionList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo code, name.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.Permission.PermissionList.placeholder',
          defaultMessage: 'Nhập code, name.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.code', defaultMessage: 'Code' }),
      dataIndex: 'code',
      width: 120,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Name' }),
      dataIndex: 'name',
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.color', defaultMessage: 'Màu sắc' }),
      dataIndex: 'color',
      width: 150,
      renderText: (dom) => dom && <Tag color={dom}>{dom}</Tag>,
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
      renderText: (dom, record: PermissionItem) => {
        return <ChangeStatusPermission status={dom} record={record} />;
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
          key="update-permission"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'permission/updatePermissionForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-permission"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'permission/updatePermissionForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<PermissionItem>
        headerTitle={intl.formatMessage({
          id: 'pages.Admin.Permission.PermissionList.headerTitle',
          defaultMessage: 'Danh sách Permission',
        })}
        actionRef={actionRef}
        rowKey="id"
        sticky={true}
        pagination={{ ...PAGINATE_OPTIONS }}
        request={async (params, sort, filter) => {
          return await queryPermissions(params, sort, filter);
        }}
        toolBarRender={() => [<CreatePermission key="create-permission" />]}
        columns={columns}
        scroll={scrollTable}
      />
    </div>
  );
};

export default PermissionList;

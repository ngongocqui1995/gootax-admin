import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getDeleteTooltip,
  getPopupConfirmDelete,
  getTypeMenuEnum,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { CopyTwoTone, DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Popconfirm, Space, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import Access from '@/components/Access';
import CreateRoleToMenu from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/components/ToolBar/CreateRoleToMenu';
import { RoleToMenu } from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/data';
import {
  deleteRoleToMenu,
  queryRoleToMenu,
} from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/service';
import { RoleModalState } from '@/pages/Admin/Role/model';
import { TYPE_FORM, typeMenuEnum } from '@/utils/utils.enum';
import { useDispatch, useIntl, useSelector } from '@umijs/max';

const RoleToMenuList: React.FC = () => {
  const intl = useIntl();
  const role: RoleModalState = useSelector((state: any) => state?.role);
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'role/updateMenuList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<RoleToMenu>[] = [
    {
      title: intl.formatMessage({ id: 'pages.menu', defaultMessage: 'Menu' }),
      dataIndex: ['menu', 'url'],
      width: 150,
      search: false,
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'pages.permission', defaultMessage: 'Permission' }),
      dataIndex: 'permission',
      width: 150,
      search: false,
      ellipsis: true,
      render: (_, record: RoleToMenu) => {
        return (
          <Space>
            {record.permissions?.map((it) => (
              <Tag key={it.id} color={it.color}>
                {it.name}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.type', defaultMessage: 'Loại' }),
      dataIndex: 'type',
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.type.placeholder',
          defaultMessage: 'Chọn loại.',
        }),
      },
      width: 120,
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: getTypeMenuEnum(),
      renderText: (_, record: RoleToMenu) => {
        return (
          record?.type && (
            <Tag color={typeMenuEnum[record?.type]?.color}>{typeMenuEnum[record?.type]?.text}</Tag>
          )
        );
      },
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
      title: intl.formatMessage({ id: 'pages.options', defaultMessage: 'Tuỳ chỉnh' }),
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: 90,
      hideInTable: !access.accessible([TYPE_FORM.UPDATE, TYPE_FORM.COPY, TYPE_FORM.DELETE]),
      render: (_, record) => [
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE])}`}
          key="update-menu"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'role/updateMenuForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-menu"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'role/updateMenuForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.DELETE])}`}
          key="delete-menu"
          title={getDeleteTooltip()}
          color="cyan"
          placement="left"
        >
          <Popconfirm
            placement="bottomRight"
            title={getPopupConfirmDelete()}
            onConfirm={async () => {
              await deleteRoleToMenu(record?.id);
              actionRef.current?.reload();
            }}
            okText={intl.formatMessage({ id: 'pages.OK', defaultMessage: 'Ok' })}
            cancelText={intl.formatMessage({ id: 'pages.Cancel', defaultMessage: 'Huỷ' })}
          >
            <DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />
          </Popconfirm>
        </Tooltip>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<RoleToMenu>
        headerTitle={intl.formatMessage({
          id: 'pages.Admin.Menu.MenuList.headerTitle',
          defaultMessage: 'Danh sách Menu',
        })}
        type="table"
        search={false}
        actionRef={actionRef}
        rowKey="id"
        pagination={{ ...PAGINATE_OPTIONS, defaultPageSize: 10 }}
        params={{ role: role.RoleForm?.itemEdit?.id }}
        request={async (params, sort, filter) => {
          return await queryRoleToMenu(params, sort, filter);
        }}
        toolBarRender={() => [<CreateRoleToMenu key="create-menu" />]}
        columns={columns}
        scroll={scrollTable}
      />
    </div>
  );
};

export default RoleToMenuList;

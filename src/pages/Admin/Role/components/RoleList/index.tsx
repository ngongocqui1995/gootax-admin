import {
  FALLBACK_STRING,
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getStatusEnum,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { CopyTwoTone, EditTwoTone, EyeOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Image, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import Access from '@/components/Access';
import ChangeStatusRole from '@/pages/Admin/Role/components/RoleList/components/ChangeStatusRole';
import RoleToMenuListExpand from '@/pages/Admin/Role/components/RoleList/components/RoleToMenuListExpand';
import CreateRole from '@/pages/Admin/Role/components/RoleList/components/ToolBar/CreateRole';
import { RoleItem } from '@/pages/Admin/Role/data';
import { queryRoles } from '@/pages/Admin/Role/service';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import styles from '@/utils/utils.less';
import { useDispatch, useIntl } from '@umijs/max';

const RoleList: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const actionRef = useRef<ActionType>();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'role/updateRoleList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<RoleItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.Role.RoleList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.Role.RoleList.placeholder',
          defaultMessage: 'Nhập tên.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: RoleItem) => {
        return (
          <a className={styles.avatar}>
            <Image
              placeholder={
                <Image height={SIZE_AVATAR.height} src="error" fallback={FALLBACK_STRING} />
              }
              preview={{
                mask: <EyeOutlined />,
              }}
              height={SIZE_AVATAR.height}
              width={SIZE_AVATAR.width}
              src={record?.avatar || ''}
              fallback={FALLBACK_STRING}
            />
          </a>
        );
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.code', defaultMessage: 'Mã' }),
      dataIndex: 'code',
      width: 120,
      search: false,
      renderText: (dom) => dom && <Tag color="default">{dom}</Tag>,
    },
    {
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
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
      renderText: (dom, record: RoleItem) => {
        return <ChangeStatusRole status={dom} record={record} />;
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
          key="update-role"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'role/updateRoleForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-role"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'role/updateRoleForm',
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
      <ProTable<RoleItem>
        headerTitle={intl.formatMessage({
          id: 'pages.Admin.Role.RoleList.headerTitle',
          defaultMessage: 'Danh sách role',
        })}
        actionRef={actionRef}
        rowKey="id"
        sticky={true}
        pagination={{ ...PAGINATE_OPTIONS }}
        request={async (params, sort, filter) => {
          return await queryRoles(params, sort, filter);
        }}
        toolBarRender={() => [<CreateRole key="create-role" />]}
        columns={columns}
        scroll={scrollTable}
        expandable={{
          expandedRowRender: (record) => <RoleToMenuListExpand data={record} />,
          rowExpandable: (record) => record?.id !== 'Not Expandable',
        }}
      />
    </div>
  );
};

export default RoleList;

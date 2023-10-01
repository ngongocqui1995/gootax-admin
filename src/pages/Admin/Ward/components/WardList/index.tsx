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
import { TYPE_FORM } from '@/utils/utils.enum';
import { useDispatch, useIntl } from '@umijs/max';
import { Tag, Tooltip } from 'antd';
import { WardItem } from '../../data';
import { queryWards } from '../../service';
import ChangeStatusWard from './components/ChangeStatusWard';
import CreateWard from './components/ToolBar/CreateWard';

const WardList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'ward/updateWardList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<WardItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.Ward.WardList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên, số điện thoại.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.Ward.WardList.placeholder',
          defaultMessage: 'Nhập mã, tên, số điện thoại.',
        }),
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
      renderText: (dom, record: WardItem) => {
        return <ChangeStatusWard status={dom} record={record} />;
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
          key="update-ward"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'ward/updateWardForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-ward"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'ward/updateWardForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE_PASSWORD])}`}
          key="change-password-ward"
          title={getUpdatePasswordTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'ward/updateWardForm',
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
      <ProTable<WardItem>
        headerTitle={intl.formatMessage({
          id: 'pages.Admin.Ward.WardList.headerTitle',
          defaultMessage: 'Danh sách khách hàng',
        })}
        actionRef={actionRef}
        rowKey="id"
        sticky={true}
        pagination={{ ...PAGINATE_OPTIONS }}
        request={async (params, sort, filter) => {
          return await queryWards(params, sort, filter);
        }}
        toolBarRender={() => [<CreateWard key="create-ward" />]}
        columns={columns}
        scroll={scrollTable}
      />
    </div>
  );
};

export default WardList;

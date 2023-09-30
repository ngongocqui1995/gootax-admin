import {
  FALLBACK_STRING,
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getGenderEnum,
  getStatusEnum,
  getUpdatePasswordTooltip,
  getUpdateTooltip,
  phoneFormatter,
  scrollTable,
} from '@/utils/utils';
import { CopyTwoTone, EditTwoTone, EyeOutlined, LockOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import Access from '@/components/Access';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import styles from '@/utils/utils.less';
import { useDispatch, useIntl } from '@umijs/max';
import { Image, Tooltip } from 'antd';
import { CustomerItem } from '../../data';
import { queryCustomers } from '../../service';
import ChangeStatusCustomer from './components/ChangeStatusCustomer';
import CreateCustomer from './components/ToolBar/CreateCustomer';

const CustomerList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'customer/updateCustomerList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<CustomerItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên, số điện thoại.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerList.placeholder',
          defaultMessage: 'Nhập mã, tên, số điện thoại.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: CustomerItem) => {
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
      title: intl.formatMessage({ id: 'pages.name', defaultMessage: 'Tên' }),
      dataIndex: 'name',
      width: 150,
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.phone', defaultMessage: 'Số điện thoại' }),
      dataIndex: 'phone',
      width: 130,
      renderText: (dom) => phoneFormatter(dom),
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'pages.gender', defaultMessage: 'Giới tính' }),
      dataIndex: 'gender',
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.gender.placeholder',
          defaultMessage: 'Chọn giới tính.',
        }),
      },
      width: 120,
      valueType: 'select',
      valueEnum: getGenderEnum(),
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
      renderText: (dom, record: CustomerItem) => {
        return <ChangeStatusCustomer status={dom} record={record} />;
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
          key="update-customer"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'customer/updateCustomerForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-customer"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'customer/updateCustomerForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE_PASSWORD])}`}
          key="change-password-customer"
          title={getUpdatePasswordTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'customer/updateCustomerForm',
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
      <ProTable<CustomerItem>
        headerTitle={intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerList.headerTitle',
          defaultMessage: 'Danh sách khách hàng',
        })}
        actionRef={actionRef}
        rowKey="id"
        sticky={true}
        pagination={{ ...PAGINATE_OPTIONS }}
        request={async (params, sort, filter) => {
          return await queryCustomers(params, sort, filter);
        }}
        toolBarRender={() => [<CreateCustomer key="create-customer" />]}
        columns={columns}
        scroll={scrollTable}
      />
    </div>
  );
};

export default CustomerList;

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
import { SelectCar } from '@/components/ProForm';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import styles from '@/utils/utils.less';
import { useDispatch, useIntl } from '@umijs/max';
import { Image, Tooltip } from 'antd';
import { DriverItem } from '../../data';
import { queryDrivers } from '../../service';
import ChangeStatusDriver from './component/ChangeStatusDriver';
import CreateDriver from './component/ToolBar/CreateDriver';

const DriverList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'driver/updateDriverList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<DriverItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.Driver.DriverList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên, số điện thoại.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.Driver.DriverList.placeholder',
          defaultMessage: 'Nhập mã, tên, số điện thoại.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: DriverItem) => {
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
      title: 'Xe',
      dataIndex: ['car', 'name'],
      key: 'car',
      width: 150,
      fieldProps: { placeholder: 'Chọn xe' },
      renderFormItem: () => {
        return <SelectCar noStyle rules={[]} />;
      },
      valueType: 'select',
    },
    {
      title: 'Hãng xe',
      dataIndex: ['car', 'company', 'name'],
      width: 150,
      search: false,
    },
    {
      title: 'Dòng xe',
      dataIndex: ['car', 'vehicle', 'name'],
      width: 150,
      search: false,
    },
    {
      title: 'Kiểu dáng xe',
      dataIndex: ['car', 'car_style', 'name'],
      width: 150,
      search: false,
    },
    {
      title: 'Loại xe',
      dataIndex: ['car', 'type_car', 'name'],
      width: 150,
      search: false,
    },
    {
      title: 'Số ghế ngồi',
      dataIndex: ['car', 'seat'],
      width: 150,
      search: false,
    },
    {
      title: 'Năm sản xuất xe',
      dataIndex: ['car', 'year'],
      width: 150,
      valueType: 'dateYear',
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
      renderText: (dom, record: DriverItem) => {
        return <ChangeStatusDriver status={dom} record={record} />;
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
          key="update-driver"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'driver/updateDriverForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-driver"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'driver/updateDriverForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE_PASSWORD])}`}
          key="change-password-driver"
          title={getUpdatePasswordTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'driver/updateDriverForm',
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
      <ProTable<DriverItem>
        headerTitle={intl.formatMessage({
          id: 'pages.Admin.Driver.DriverList.headerTitle',
          defaultMessage: 'Danh sách tài xế',
        })}
        search={{
          layout: 'vertical',
        }}
        actionRef={actionRef}
        rowKey="id"
        sticky={true}
        pagination={{ ...PAGINATE_OPTIONS }}
        request={async (params, sort, filter) => {
          return await queryDrivers(params, sort, filter);
        }}
        toolBarRender={() => [<CreateDriver key="create-driver" />]}
        columns={columns}
        scroll={scrollTable}
      />
    </div>
  );
};

export default DriverList;

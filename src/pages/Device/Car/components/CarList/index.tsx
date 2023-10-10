import {
  FALLBACK_STRING,
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getStatusEnum,
  getUpdatePasswordTooltip,
  getUpdateTooltip,
  scrollTable,
} from '@/utils/utils';
import { CopyTwoTone, EditTwoTone, EyeOutlined, LockOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import Access from '@/components/Access';
import { SelectCarStyle, SelectCompany, SelectTypeCar, SelectVehicle } from '@/components/ProForm';
import { SIZE_AVATAR, TYPE_FORM } from '@/utils/utils.enum';
import styles from '@/utils/utils.less';
import { ProFormDependency } from '@ant-design/pro-components';
import { useDispatch, useIntl } from '@umijs/max';
import { Image, Tooltip } from 'antd';
import { CarItem } from '../../data';
import { queryCars } from '../../service';
import ChangeStatusCar from './components/ChangeStatusCar';
import CreateCar from './components/ToolBar/CreateCar';

const CarList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'car/updateCarList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<CarItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Device.Car.CarList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Device.Car.CarList.placeholder',
          defaultMessage: 'Nhập tên.',
        }),
      },
    },
    {
      title: intl.formatMessage({ id: 'pages.avatar', defaultMessage: 'Ảnh' }),
      dataIndex: 'avatar',
      width: 120,
      search: false,
      render: (_, record: CarItem) => {
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
      title: 'Tên xe',
      dataIndex: 'name',
      width: 150,
      search: false,
    },
    {
      title: 'Hãng xe',
      dataIndex: ['company', 'name'],
      key: 'company',
      width: 150,
      fieldProps: { placeholder: 'Chọn hãng xe' },
      renderFormItem: () => {
        return <SelectCompany noStyle rules={[]} />;
      },
      valueType: 'select',
    },
    {
      title: 'Dòng xe',
      dataIndex: ['vehicle', 'name'],
      key: 'vehicle',
      width: 150,
      fieldProps: { placeholder: 'Chọn dòng xe' },
      renderFormItem: () => {
        return (
          <ProFormDependency name={['company']}>
            {({ company }) => {
              return <SelectVehicle params={{ company }} noStyle rules={[]} />;
            }}
          </ProFormDependency>
        );
      },
      valueType: 'select',
    },
    {
      title: 'Tên kiểu dáng',
      dataIndex: ['car_style', 'name'],
      key: 'car_style',
      width: 150,
      fieldProps: { placeholder: 'Chọn kiểu dáng' },
      renderFormItem: () => {
        return <SelectCarStyle noStyle rules={[]} />;
      },
      valueType: 'select',
    },
    {
      title: 'Loại xe',
      dataIndex: ['type_car', 'name'],
      key: 'type_car',
      width: 150,
      fieldProps: { placeholder: 'Chọn loại xe' },
      renderFormItem: () => {
        return <SelectTypeCar noStyle rules={[]} />;
      },
      valueType: 'select',
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'seat',
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
      renderText: (dom, record: CarItem) => {
        return <ChangeStatusCar status={dom} record={record} />;
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
          key="update-car"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'car/updateCarForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-car"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'car/updateCarForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE_PASSWORD])}`}
          key="change-password-car"
          title={getUpdatePasswordTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'car/updateCarForm',
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
      <ProTable<CarItem>
        headerTitle={intl.formatMessage({
          id: 'pages.Device.Car.CarList.headerTitle',
          defaultMessage: 'Danh sách xe',
        })}
        search={{
          layout: 'vertical',
        }}
        actionRef={actionRef}
        rowKey="id"
        sticky={true}
        pagination={{ ...PAGINATE_OPTIONS }}
        request={async (params, sort, filter) => {
          return await queryCars(params, sort, filter);
        }}
        toolBarRender={() => [<CreateCar key="create-car" />]}
        columns={columns}
        scroll={scrollTable}
      />
    </div>
  );
};

export default CarList;

import {
  PAGINATE_OPTIONS,
  getCopyTooltip,
  getStatusEnum,
  getUpdatePasswordTooltip,
  getUpdateTooltip,
  phoneFormatter,
  scrollTable,
} from '@/utils/utils';
import { CopyTwoTone, EditTwoTone, LockOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import Access from '@/components/Access';
import { SelectTypeCar } from '@/components/ProForm';
import { TYPE_FORM } from '@/utils/utils.enum';
import { useDispatch, useIntl } from '@umijs/max';
import { Tooltip } from 'antd';
import { BookCarItem } from '../../data';
import { queryBookCars } from '../../service';
import ChangeStatusBookCar from './components/ChangeStatusBookCar';
import CreateBookCar from './components/ToolBar/CreateBookCar';

const BookCarList: React.FC = () => {
  const intl = useIntl();
  const actionRef = useRef<ActionType>();
  const dispatch = useDispatch();
  const access = Access();

  useEffect(() => {
    dispatch({
      type: 'book_car/updateBookCarList',
      payload: {
        reload: () => actionRef.current?.reload(),
      },
    });
  }, []);

  const columns: ProColumns<BookCarItem>[] = [
    {
      title: intl.formatMessage({ id: 'pages.keyword', defaultMessage: 'Tìm theo' }),
      dataIndex: 'keyword',
      hideInTable: true,
      formItemProps: {
        tooltip: intl.formatMessage({
          id: 'pages.Admin.BookCar.BookCarList.tooltip',
          defaultMessage: 'Bạn có thể tìm kiếm theo tên, số điện thoại.',
        }),
      },
      fieldProps: {
        placeholder: intl.formatMessage({
          id: 'pages.Admin.BookCar.BookCarList.placeholder',
          defaultMessage: 'Nhập mã, tên, số điện thoại.',
        }),
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
      title: 'Địa chỉ đón',
      dataIndex: 'from_address',
      width: 200,
      search: false,
      ellipsis: true,
    },
    {
      title: 'Địa chỉ đến',
      dataIndex: 'to_address',
      width: 200,
      search: false,
      ellipsis: true,
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
      renderText: (dom, record: BookCarItem) => {
        return <ChangeStatusBookCar status={dom} record={record} />;
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
          key="update-book-car"
          title={getUpdateTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'book_car/updateBookCarForm',
                payload: { itemEdit: record, type: TYPE_FORM.UPDATE },
              });
            }}
          >
            <EditTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.COPY])}`}
          key="copy-book-car"
          title={getCopyTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'book_car/updateBookCarForm',
                payload: { itemEdit: record, type: TYPE_FORM.COPY },
              });
            }}
          >
            <CopyTwoTone style={{ fontSize: '16px', color: '#08c' }} />
          </a>
        </Tooltip>,
        <Tooltip
          className={`${access.className([TYPE_FORM.UPDATE_PASSWORD])}`}
          key="change-password-book-car"
          title={getUpdatePasswordTooltip()}
          color="cyan"
          placement="left"
        >
          <a
            onClick={() => {
              dispatch({
                type: 'book_car/updateBookCarForm',
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
      <ProTable<BookCarItem>
        headerTitle={intl.formatMessage({
          id: 'pages.Admin.BookCar.BookCarList.headerTitle',
          defaultMessage: 'Danh sách đặt xe',
        })}
        search={{
          layout: 'vertical',
        }}
        actionRef={actionRef}
        rowKey="id"
        sticky={true}
        pagination={{ ...PAGINATE_OPTIONS }}
        request={async (params, sort, filter) => {
          return await queryBookCars(params, sort, filter);
        }}
        toolBarRender={() => [<CreateBookCar key="create-book-car" />]}
        columns={columns}
        scroll={scrollTable}
      />
    </div>
  );
};

export default BookCarList;

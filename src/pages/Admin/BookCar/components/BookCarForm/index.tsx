import { Card, Divider, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import {
  SelectAddress,
  SelectDistrict,
  SelectProvince,
  SelectRoad,
  SelectTypeCar,
  SelectWard,
  TextName,
  TextPhone,
} from '@/components/ProForm';
import { TYPE_FORM } from '@/utils/utils.enum';
import { ProFormText } from '@ant-design/pro-components';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { Button } from 'antd';
import { BookCarModalState } from '../../model';
import { checkPrice, createBookCar, updateBookCar } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const BookCarForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const book_car: BookCarModalState = useSelector((state: any) => state?.book_car);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (book_car.BookCarForm?.type) {
        if (book_car.BookCarForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(book_car.BookCarForm?.type)) {
          form.setFieldsValue({
            ...book_car.BookCarForm.itemEdit,
            type_car: book_car.BookCarForm.itemEdit?.type_car?.id,
            from_address: {
              label: book_car.BookCarForm.itemEdit?.from_address,
            },
            from_address_province: {
              label: book_car.BookCarForm.itemEdit?.from_address_province?.name,
              value: book_car.BookCarForm.itemEdit?.from_address_province?.id,
            },
            from_address_district: {
              label: book_car.BookCarForm.itemEdit?.from_address_district?.name,
              value: book_car.BookCarForm.itemEdit?.from_address_district?.id,
            },
            from_address_ward: {
              label: book_car.BookCarForm.itemEdit?.from_address_ward?.name,
              value: book_car.BookCarForm.itemEdit?.from_address_ward?.id,
            },
            from_address_road: {
              label: book_car.BookCarForm.itemEdit?.from_address_road?.name,
              value: book_car.BookCarForm.itemEdit?.from_address_road?.id,
            },
            to_address: {
              label: book_car.BookCarForm.itemEdit?.to_address,
            },
            to_address_province: {
              label: book_car.BookCarForm.itemEdit?.to_address_province?.name,
              value: book_car.BookCarForm.itemEdit?.to_address_province?.id,
            },
            to_address_district: {
              label: book_car.BookCarForm.itemEdit?.to_address_district?.name,
              value: book_car.BookCarForm.itemEdit?.to_address_district?.id,
            },
            to_address_ward: {
              label: book_car.BookCarForm.itemEdit?.to_address_ward?.name,
              value: book_car.BookCarForm.itemEdit?.to_address_ward?.id,
            },
            to_address_road: {
              label: book_car.BookCarForm.itemEdit?.to_address_road?.name,
              value: book_car.BookCarForm.itemEdit?.to_address_road?.id,
            },
          });
        }
      }
      setModalVisible(!!book_car.BookCarForm?.type);
    })();
  }, [book_car.BookCarForm?.type]);

  const callCheckPrice = async () => {
    let priceAndDistance = await checkPrice({
      from_lat: form.getFieldsValue().from_address_lat,
      from_lng: form.getFieldsValue().from_address_lng,
      to_lat: form.getFieldsValue().to_address_lat,
      to_lng: form.getFieldsValue().to_address_lng,
      type_car_id: form.getFieldsValue().type_car,
    });

    form.setFieldsValue({
      distance: priceAndDistance?.distance || 0,
      amount: priceAndDistance?.amount || 0,
    });
  };

  const renderContent = () => {
    if (!book_car.BookCarForm?.type) return;
    return (
      <>
        <TextName />
        <TextPhone />
        <SelectTypeCar
          label="Loại xe"
          type={book_car.BookCarForm.type}
          defaultOptions={
            (book_car.BookCarForm.itemEdit?.type_car?.id && [
              {
                value: book_car.BookCarForm.itemEdit?.type_car.id || '',
                label: book_car.BookCarForm.itemEdit?.type_car.name || '',
              },
            ]) ||
            []
          }
        />
        <Card title="Địa chỉ đón">
          <SelectProvince
            name="from_address_province"
            type={book_car.BookCarForm.type}
            defaultOptions={
              (book_car.BookCarForm.itemEdit?.from_address_province?.id && [
                {
                  value: book_car.BookCarForm.itemEdit?.from_address_province.id || '',
                  label: book_car.BookCarForm.itemEdit?.from_address_province.name || '',
                },
              ]) ||
              []
            }
            fieldProps={{
              labelInValue: true,
              onChange: () => {
                form.setFieldsValue({
                  from_address_district: undefined,
                  from_address_ward: undefined,
                  from_address_road: undefined,
                  from_address: undefined,
                });
              },
            }}
          />
          <ProFormDependency name={['from_address_province']}>
            {({ from_address_province }) => {
              return (
                <SelectDistrict
                  name="from_address_district"
                  params={{ province: from_address_province?.value }}
                  type={book_car.BookCarForm?.type}
                  defaultOptions={
                    (book_car.BookCarForm?.itemEdit?.from_address_district?.id && [
                      {
                        value: book_car.BookCarForm?.itemEdit?.from_address_district.id || '',
                        label: book_car.BookCarForm?.itemEdit?.from_address_district.name || '',
                      },
                    ]) ||
                    []
                  }
                  fieldProps={{
                    labelInValue: true,
                    onChange: () => {
                      form.setFieldsValue({
                        from_address_ward: undefined,
                        from_address_road: undefined,
                        from_address: undefined,
                      });
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
          <ProFormDependency name={['from_address_province', 'from_address_district']}>
            {({ from_address_province, from_address_district }) => {
              return (
                <SelectWard
                  name="from_address_ward"
                  params={{
                    province: from_address_province?.value,
                    district: from_address_district?.value,
                  }}
                  type={book_car.BookCarForm?.type}
                  defaultOptions={
                    (book_car.BookCarForm?.itemEdit?.from_address_ward?.id && [
                      {
                        value: book_car.BookCarForm?.itemEdit?.from_address_ward.id || '',
                        label: book_car.BookCarForm?.itemEdit?.from_address_ward.name || '',
                      },
                    ]) ||
                    []
                  }
                  fieldProps={{
                    labelInValue: true,
                    onChange: () => {
                      form.setFieldsValue({
                        from_address_road: undefined,
                        from_address: undefined,
                      });
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
          <ProFormDependency
            name={['from_address_province', 'from_address_district', 'from_address_ward']}
          >
            {({ from_address_province, from_address_district, from_address_ward }) => {
              return (
                <SelectRoad
                  name="from_address_road"
                  params={{
                    province: from_address_province?.value,
                    district: from_address_district?.value,
                    ward: from_address_ward?.value,
                  }}
                  type={book_car.BookCarForm?.type}
                  defaultOptions={
                    (book_car.BookCarForm?.itemEdit?.from_address_road?.id && [
                      {
                        value: book_car.BookCarForm?.itemEdit?.from_address_road.id || '',
                        label: book_car.BookCarForm?.itemEdit?.from_address_road.name || '',
                      },
                    ]) ||
                    []
                  }
                  fieldProps={{
                    labelInValue: true,
                    onChange: () => {
                      form.setFieldsValue({ from_address: undefined });
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
          <ProFormDependency
            name={[
              'from_address_province',
              'from_address_district',
              'from_address_ward',
              'from_address_road',
            ]}
          >
            {({
              from_address_province,
              from_address_district,
              from_address_ward,
              from_address_road,
            }) => {
              return (
                <SelectAddress
                  name="from_address"
                  label="Địa chỉ"
                  params={{
                    province: from_address_province?.label,
                    district: from_address_district?.label,
                    ward: from_address_ward?.label,
                    road: from_address_road?.label,
                  }}
                  fieldProps={{
                    labelInValue: true,
                    onChange(value, option: any) {
                      form.setFieldsValue({
                        from_address_lat: option?.item?.geometry?.location?.lat || 0,
                        from_address_lng: option?.item?.geometry?.location?.lng || 0,
                      });
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
        </Card>
        <Divider />
        <Card title="Địa chỉ đến">
          <SelectProvince
            name="to_address_province"
            type={book_car.BookCarForm.type}
            defaultOptions={
              (book_car.BookCarForm.itemEdit?.to_address_province?.id && [
                {
                  value: book_car.BookCarForm.itemEdit?.to_address_province.id || '',
                  label: book_car.BookCarForm.itemEdit?.to_address_province.name || '',
                },
              ]) ||
              []
            }
            fieldProps={{
              labelInValue: true,
              onChange: () => {
                form.setFieldsValue({
                  to_address_district: undefined,
                  to_address_ward: undefined,
                  to_address_road: undefined,
                  to_address: undefined,
                });
              },
            }}
          />
          <ProFormDependency name={['to_address_province']}>
            {({ to_address_province }) => {
              return (
                <SelectDistrict
                  name="to_address_district"
                  type={book_car.BookCarForm?.type}
                  params={{ province: to_address_province?.value }}
                  defaultOptions={
                    (book_car.BookCarForm?.itemEdit?.to_address_district?.id && [
                      {
                        value: book_car.BookCarForm?.itemEdit?.to_address_district.id || '',
                        label: book_car.BookCarForm?.itemEdit?.to_address_district.name || '',
                      },
                    ]) ||
                    []
                  }
                  fieldProps={{
                    labelInValue: true,
                    onChange: () => {
                      form.setFieldsValue({
                        to_address_ward: undefined,
                        to_address_road: undefined,
                        to_address: undefined,
                      });
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
          <ProFormDependency name={['to_address_province', 'to_address_district']}>
            {({ to_address_province, to_address_district }) => {
              return (
                <SelectWard
                  name="to_address_ward"
                  type={book_car.BookCarForm?.type}
                  params={{
                    province: to_address_province?.value,
                    district: to_address_district?.value,
                  }}
                  defaultOptions={
                    (book_car.BookCarForm?.itemEdit?.to_address_ward?.id && [
                      {
                        value: book_car.BookCarForm?.itemEdit?.to_address_ward.id || '',
                        label: book_car.BookCarForm?.itemEdit?.to_address_ward.name || '',
                      },
                    ]) ||
                    []
                  }
                  fieldProps={{
                    labelInValue: true,
                    onChange: () => {
                      form.setFieldsValue({
                        to_address_road: undefined,
                        to_address: undefined,
                      });
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
          <ProFormDependency
            name={['to_address_province', 'to_address_district', 'to_address_ward']}
          >
            {({ to_address_province, to_address_district, to_address_ward }) => {
              return (
                <SelectRoad
                  name="to_address_road"
                  type={book_car.BookCarForm?.type}
                  params={{
                    province: to_address_province?.value,
                    district: to_address_district?.value,
                    ward: to_address_ward?.value,
                  }}
                  defaultOptions={
                    (book_car.BookCarForm?.itemEdit?.to_address_road?.id && [
                      {
                        value: book_car.BookCarForm?.itemEdit?.to_address_road.id || '',
                        label: book_car.BookCarForm?.itemEdit?.to_address_road.name || '',
                      },
                    ]) ||
                    []
                  }
                  fieldProps={{
                    labelInValue: true,
                    onChange: () => {
                      form.setFieldsValue({
                        to_address: undefined,
                      });
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
          <ProFormDependency
            name={[
              'to_address_province',
              'to_address_district',
              'to_address_ward',
              'to_address_road',
            ]}
          >
            {({ to_address_province, to_address_district, to_address_ward, to_address_road }) => {
              return (
                <SelectAddress
                  name="to_address"
                  label="Địa chỉ"
                  params={{
                    province: to_address_province?.label,
                    district: to_address_district?.label,
                    ward: to_address_ward?.label,
                    road: to_address_road?.label,
                  }}
                  fieldProps={{
                    labelInValue: true,
                    onChange(value, option: any) {
                      form.setFieldsValue({
                        to_address_lat: option?.item?.geometry?.location?.lat || 0,
                        to_address_lng: option?.item?.geometry?.location?.lng || 0,
                      });
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>
          <ProFormText name="from_address_lat" hidden />
          <ProFormText name="from_address_lng" hidden />
          <ProFormText name="to_address_lat" hidden />
          <ProFormText name="to_address_lng" hidden />
        </Card>
        <Button type="primary" onClick={callCheckPrice} className="mt-4">
          Báo giá
        </Button>
        <Divider />
        <Card title="Báo giá">
          <ProFormText
            disabled
            name="distance"
            label="Khoảng cách"
            placeholder="Khoảng cách"
            rules={[
              {
                required: true,
                message: 'Vui lòng kiểm tra báo giá',
              },
            ]}
          />
          <ProFormText
            disabled
            name="amount"
            label="Thành tiền"
            placeholder="Thành tiền"
            rules={[
              {
                required: true,
                message: 'Vui lòng kiểm tra thành tiền',
              },
            ]}
          />
          <ProFormText name="note" label="Ghi chú" placeholder="Ghi chú" />
        </Card>
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'book_car/updateBookCarForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (book_car.BookCarForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.BookCar.BookCarForm.Create.title',
          defaultMessage: 'Thêm mới khách hàng',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.BookCar.BookCarForm.Update.title',
          defaultMessage: 'Cập nhật khách hàng',
        });

      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (book_car.BookCarForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.BookCar.BookCarForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.BookCar.BookCarForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });

      default:
        return '';
    }
  };

  return (
    <Modal
      width={800}
      title={renderTitle()}
      forceRender
      destroyOnClose
      visible={modalVisible}
      onCancel={onCancel}
      footer={false}
    >
      <div ref={modalRef}>
        <ProForm
          form={form}
          {...formLayout}
          layout="horizontal"
          onFinish={async (values) => {
            const body = {
              ...values,
              from_address: values.from_address?.label,
              from_address_province: values.from_address_province?.value,
              from_address_district: values.from_address_district?.value,
              from_address_ward: values.from_address_ward?.value,
              from_address_road: values.from_address_road?.value,
              to_address: values.to_address?.label,
              to_address_province: values.to_address_province?.value,
              to_address_district: values.to_address_district?.value,
              to_address_ward: values.to_address_ward?.value,
              to_address_road: values.to_address_road?.value,
            };

            for (const property in body) {
              if (!body[property]) delete body[property];
            }

            let res;
            switch (book_car.BookCarForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createBookCar(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateBookCar(book_car.BookCarForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              book_car.BookCarList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Admin.BookCar.BookCarForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE].includes(book_car.BookCarForm?.type) ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default BookCarForm;

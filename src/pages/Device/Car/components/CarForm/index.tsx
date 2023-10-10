import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import {
  SelectCarStyle,
  SelectCompany,
  SelectTypeCar,
  SelectVehicle,
  TextName,
  UploadAvatar,
} from '@/components/ProForm';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { TYPE_FORM } from '@/utils/utils.enum';
import { ProFormDatePicker, ProFormDependency, ProFormDigit } from '@ant-design/pro-components';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import dayjs from 'dayjs';
import { CarModalState } from '../../model';
import { createCar, updateCar } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CarForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const car: CarModalState = useSelector((state: any) => state?.car);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();
  const avatarRef = useRef<ActionAvatar>();

  useEffect(() => {
    (function () {
      if (car.CarForm?.type) {
        if (car.CarForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          form.setFieldsValue({ year: Date.now(), seat: 4 });
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(car.CarForm?.type)) {
          form.setFieldsValue({
            ...car.CarForm.itemEdit,
            company: car.CarForm.itemEdit?.company?.id,
            vehicle: car.CarForm.itemEdit?.vehicle?.id,
            type_car: car.CarForm.itemEdit?.type_car?.id,
            car_style: car.CarForm.itemEdit?.car_style?.id,
          });
        }
      }
      setModalVisible(!!car.CarForm?.type);
    })();
  }, [car.CarForm?.type]);

  const renderContent = () => {
    if (!car.CarForm?.type) return;
    return (
      <>
        <UploadAvatar ref={avatarRef} folder="avatar" />
        <SelectCompany
          type={car.CarForm.type}
          defaultOptions={[
            {
              value: car.CarForm.itemEdit?.company?.id || '',
              label: car.CarForm.itemEdit?.company?.name || '',
            },
          ]}
        />
        <ProFormDependency name={['company']}>
          {({ company }) => {
            return (
              <SelectVehicle
                params={{ company }}
                type={car.CarForm?.type}
                defaultOptions={[
                  {
                    value: car.CarForm?.itemEdit?.vehicle?.id || '',
                    label: car.CarForm?.itemEdit?.vehicle?.name || '',
                  },
                ]}
              />
            );
          }}
        </ProFormDependency>
        <TextName />
        <SelectCarStyle
          type={car.CarForm.type}
          defaultOptions={[
            {
              value: car.CarForm.itemEdit?.car_style?.id || '',
              label: car.CarForm.itemEdit?.car_style?.name || '',
            },
          ]}
        />
        <ProFormDigit
          label="Số chỗ ngồi"
          name="seat"
          rules={[{ required: true, message: 'Số chỗ ngồi là bắt buộc!' }]}
          placeholder="Nhập số chỗ ngồi"
          allowClear={false}
        />
        <SelectTypeCar
          type={car.CarForm.type}
          defaultOptions={[
            {
              value: car.CarForm.itemEdit?.type_car?.id || '',
              label: car.CarForm.itemEdit?.type_car?.name || '',
            },
          ]}
        />
        <ProFormDatePicker
          label="Năm sản xuất"
          rules={[{ required: true, message: 'Năm sản xuất là bắt buộc!' }]}
          placeholder="Chọn năm sản xuất"
          name="year"
          allowClear={false}
          fieldProps={{ picker: 'year', format: 'YYYY' }}
        />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'car/updateCarForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (car.CarForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.Car.CarForm.Create.title',
          defaultMessage: 'Thêm mới xe',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.Car.CarForm.Update.title',
          defaultMessage: 'Cập nhật xe',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (car.CarForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.Car.CarForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.Car.CarForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      default:
        return '';
    }
  };

  return (
    <Modal
      width={600}
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
              year: dayjs(values.year).toISOString(),
            };

            let res;
            switch (car.CarForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createCar(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateCar(car.CarForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              car.CarList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Device.Car.CarForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE, TYPE_FORM.UPDATE_PASSWORD].includes(car.CarForm?.type)
                ? 'hidden'
                : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default CarForm;

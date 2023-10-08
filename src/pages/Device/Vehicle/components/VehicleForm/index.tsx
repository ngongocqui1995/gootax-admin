import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { VehicleModalState } from '../../model';
import { createVehicle, updateVehicle } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const VehicleForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const vehicle: VehicleModalState = useSelector((state: any) => state?.vehicle);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (vehicle.VehicleForm?.type) {
        if (vehicle.VehicleForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(vehicle.VehicleForm?.type)) {
          form.setFieldsValue({
            ...vehicle.VehicleForm.itemEdit,
          });
        }
      }
      setModalVisible(!!vehicle.VehicleForm?.type);
    })();
  }, [vehicle.VehicleForm?.type]);

  const renderContent = () => {
    if (!vehicle.VehicleForm?.type) return;
    return (
      <>
        <TextName />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'vehicle/updateVehicleForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (vehicle.VehicleForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.Vehicle.VehicleForm.Create.title',
          defaultMessage: 'Thêm mới tài xế',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.Vehicle.VehicleForm.Update.title',
          defaultMessage: 'Cập nhật tài xế',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (vehicle.VehicleForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.Vehicle.VehicleForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.Vehicle.VehicleForm.Update.submitText',
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
              code: getKeyFromString(values.name),
            };

            let res;
            switch (vehicle.VehicleForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createVehicle(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateVehicle(vehicle.VehicleForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              vehicle.VehicleList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Device.Vehicle.VehicleForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE, TYPE_FORM.UPDATE_PASSWORD].includes(
                vehicle.VehicleForm?.type,
              )
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

export default VehicleForm;

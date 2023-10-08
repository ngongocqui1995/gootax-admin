import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { TypeCarModalState } from '../../model';
import { createTypeCar, updateTypeCar } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const TypeCarForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const type_car: TypeCarModalState = useSelector((state: any) => state?.type_car);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (type_car.TypeCarForm?.type) {
        if (type_car.TypeCarForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(type_car.TypeCarForm?.type)) {
          form.setFieldsValue({
            ...type_car.TypeCarForm.itemEdit,
          });
        }
      }
      setModalVisible(!!type_car.TypeCarForm?.type);
    })();
  }, [type_car.TypeCarForm?.type]);

  const renderContent = () => {
    if (!type_car.TypeCarForm?.type) return;
    return (
      <>
        <TextName />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'type_car/updateTypeCarForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (type_car.TypeCarForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.TypeCar.TypeCarForm.Create.title',
          defaultMessage: 'Thêm mới tài xế',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.TypeCar.TypeCarForm.Update.title',
          defaultMessage: 'Cập nhật tài xế',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (type_car.TypeCarForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.TypeCar.TypeCarForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.TypeCar.TypeCarForm.Update.submitText',
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
            switch (type_car.TypeCarForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createTypeCar(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateTypeCar(type_car.TypeCarForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              type_car.TypeCarList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Device.TypeCar.TypeCarForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE, TYPE_FORM.UPDATE_PASSWORD].includes(
                type_car.TypeCarForm?.type,
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

export default TypeCarForm;

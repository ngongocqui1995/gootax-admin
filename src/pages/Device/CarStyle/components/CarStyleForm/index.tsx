import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { CarStyleModalState } from '../../model';
import { createCarStyle, updateCarStyle } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CarStyleForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const car_style: CarStyleModalState = useSelector((state: any) => state?.car_style);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (car_style.CarStyleForm?.type) {
        if (car_style.CarStyleForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(car_style.CarStyleForm?.type)) {
          form.setFieldsValue({
            ...car_style.CarStyleForm.itemEdit,
          });
        }
      }
      setModalVisible(!!car_style.CarStyleForm?.type);
    })();
  }, [car_style.CarStyleForm?.type]);

  const renderContent = () => {
    if (!car_style.CarStyleForm?.type) return;
    return (
      <>
        <TextName />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'car_style/updateCarStyleForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (car_style.CarStyleForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.CarStyle.CarStyleForm.Create.title',
          defaultMessage: 'Thêm mới tài xế',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.CarStyle.CarStyleForm.Update.title',
          defaultMessage: 'Cập nhật tài xế',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (car_style.CarStyleForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.CarStyle.CarStyleForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.CarStyle.CarStyleForm.Update.submitText',
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
            switch (car_style.CarStyleForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createCarStyle(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateCarStyle(car_style.CarStyleForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              car_style.CarStyleList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Device.CarStyle.CarStyleForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE, TYPE_FORM.UPDATE_PASSWORD].includes(
                car_style.CarStyleForm?.type,
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

export default CarStyleForm;

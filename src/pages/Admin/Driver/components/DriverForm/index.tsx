import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import {
  SelectGender,
  TextName,
  TextPassword,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { DriverModalState } from '../../model';
import { changePasswordDriver, createDriver, updateDriver } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const DriverForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const driver: DriverModalState = useSelector((state: any) => state?.driver);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const avatarRef = useRef<ActionAvatar>();
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (driver.DriverForm?.type) {
        if (driver.DriverForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          avatarRef.current?.setImageUrl('');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(driver.DriverForm?.type)) {
          form.setFieldsValue({
            ...driver.DriverForm.itemEdit,
          });
          avatarRef.current?.setImageUrl(driver.DriverForm.itemEdit?.avatar || '');
        }
      }
      setModalVisible(!!driver.DriverForm?.type);
    })();
  }, [driver.DriverForm?.type]);

  const renderContent = () => {
    if (!driver.DriverForm?.type) return;
    return (
      <>
        {![TYPE_FORM.UPDATE_PASSWORD].includes(driver.DriverForm?.type) && (
          <>
            <UploadAvatar ref={avatarRef} folder="avatar" />
            <TextName />
            <TextPhone />
            {driver.DriverForm?.type !== TYPE_FORM.UPDATE && <TextPassword />}
            <SelectGender
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
          </>
        )}
        {[TYPE_FORM.UPDATE_PASSWORD].includes(driver.DriverForm?.type) && (
          <>
            <TextPassword
              name="new_password"
              label={intl.formatMessage({
                id: 'pages.new_password',
                defaultMessage: 'Mật khẩu mới',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.new_password.placeholder',
                defaultMessage: 'Nhập mật khẩu mới',
              })}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            />
            <TextPassword
              name="confirm_password"
              label={intl.formatMessage({
                id: 'pages.confirm_password',
                defaultMessage: 'Mật khẩu xác nhận',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.confirm_password.placeholder',
                defaultMessage: 'Nhập mật khẩu xác nhận',
              })}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
            />
          </>
        )}
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'driver/updateDriverForm', payload: { type: '' } });
    form.resetFields();
    avatarRef.current?.setImageUrl('');
  };

  const renderTitle = () => {
    switch (driver.DriverForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.Driver.DriverForm.Create.title',
          defaultMessage: 'Thêm mới tài xế',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.Driver.DriverForm.Update.title',
          defaultMessage: 'Cập nhật tài xế',
        });
      case TYPE_FORM.UPDATE_PASSWORD:
        return intl.formatMessage({
          id: 'pages.Admin.Driver.DriverForm.UpdatePassword.title',
          defaultMessage: 'Đổi mật khẩu',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (driver.DriverForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.Driver.DriverForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.Driver.DriverForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case TYPE_FORM.UPDATE_PASSWORD:
        return intl.formatMessage({
          id: 'pages.Admin.Driver.DriverForm.UpdatePassword.submitText',
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
              avatar: avatarRef.current?.getImageUrl(),
            };

            let res;
            switch (driver.DriverForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createDriver(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateDriver(driver.DriverForm.itemEdit?.id || '', body);
                break;
              }
              case TYPE_FORM.UPDATE_PASSWORD: {
                delete body.avatar;
                res = await changePasswordDriver(driver.DriverForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              driver.DriverList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Admin.Driver.DriverForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE, TYPE_FORM.UPDATE_PASSWORD].includes(
                driver.DriverForm?.type,
              )
                ? 'hidden'
                : '',
            },
          }}
          onReset={() => {
            avatarRef.current?.setImageUrl('');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default DriverForm;

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
import { CustomerModalState } from '../../model';
import { changePasswordCustomer, createCustomer, updateCustomer } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CustomerForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const customer: CustomerModalState = useSelector((state: any) => state?.customer);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const avatarRef = useRef<ActionAvatar>();
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (customer.CustomerForm?.type) {
        if (customer.CustomerForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          avatarRef.current?.setImageUrl('');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(customer.CustomerForm?.type)) {
          form.setFieldsValue({
            ...customer.CustomerForm.itemEdit,
          });
          avatarRef.current?.setImageUrl(customer.CustomerForm.itemEdit?.avatar || '');
        }
      }
      setModalVisible(!!customer.CustomerForm?.type);
    })();
  }, [customer.CustomerForm?.type]);

  const renderContent = () => {
    if (!customer.CustomerForm?.type) return;
    return (
      <>
        {![TYPE_FORM.UPDATE_PASSWORD].includes(customer.CustomerForm?.type) && (
          <>
            <UploadAvatar ref={avatarRef} folder="avatar" />
            <TextName />
            <TextPhone />
            {customer.CustomerForm?.type !== TYPE_FORM.UPDATE && <TextPassword />}
            <SelectGender
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
          </>
        )}
        {[TYPE_FORM.UPDATE_PASSWORD].includes(customer.CustomerForm?.type) && (
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
    dispatch({ type: 'customer/updateCustomerForm', payload: { type: '' } });
    form.resetFields();
    avatarRef.current?.setImageUrl('');
  };

  const renderTitle = () => {
    switch (customer.CustomerForm?.type) {
      case TYPE_FORM.CREATE:
        return intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Create.title',
          defaultMessage: 'Thêm mới người dùng',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Update.title',
          defaultMessage: 'Cập nhật người dùng',
        });
      case TYPE_FORM.UPDATE_PASSWORD:
        return intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.UpdatePassword.title',
          defaultMessage: 'Đổi mật khẩu',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (customer.CustomerForm?.type) {
      case TYPE_FORM.CREATE:
        return intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case TYPE_FORM.UPDATE_PASSWORD:
        return intl.formatMessage({
          id: 'pages.Admin.Customer.CustomerForm.UpdatePassword.submitText',
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
            switch (customer.CustomerForm?.type) {
              case TYPE_FORM.CREATE: {
                res = await createCustomer(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateCustomer(customer.CustomerForm.itemEdit?.id || '', body);
                break;
              }
              case TYPE_FORM.UPDATE_PASSWORD: {
                delete body.avatar;
                res = await changePasswordCustomer(customer.CustomerForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              customer.CustomerList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Admin.Customer.CustomerForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE, TYPE_FORM.UPDATE_PASSWORD].includes(
                customer.CustomerForm?.type,
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

export default CustomerForm;

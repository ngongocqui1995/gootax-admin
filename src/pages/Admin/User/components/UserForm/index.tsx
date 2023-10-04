import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import {
  SelectGender,
  SelectRole,
  TextEmail,
  TextName,
  TextPassword,
  TextPhone,
  UploadAvatar,
} from '@/components/ProForm';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { UserModalState } from '@/pages/Admin/User/model';
import { changePasswordUser, createUser, updateUser } from '@/pages/Admin/User/service';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const user: UserModalState = useSelector((state: any) => state?.user);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const avatarRef = useRef<ActionAvatar>();
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (user.UserForm?.type) {
        if (user.UserForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          avatarRef.current?.setImageUrl('');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(user.UserForm?.type)) {
          form.setFieldsValue({
            ...user.UserForm.itemEdit,
            role: user.UserForm.itemEdit?.role?.id,
          });
          avatarRef.current?.setImageUrl(user.UserForm.itemEdit?.avatar || '');
        }
      }
      setModalVisible(!!user.UserForm?.type);
    })();
  }, [user.UserForm?.type]);

  const renderContent = () => {
    if (!user.UserForm?.type) return;
    return (
      <>
        {![TYPE_FORM.UPDATE_PASSWORD].includes(user.UserForm?.type) && (
          <>
            <UploadAvatar ref={avatarRef} folder="avatar" />
            <TextName />
            <TextPhone />
            <TextEmail />
            {user.UserForm?.type !== TYPE_FORM.UPDATE && <TextPassword />}
            <SelectGender
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
            <SelectRole
              fieldProps={{
                getPopupContainer: (node) => (modalRef && modalRef.current) || node.parentNode,
              }}
            />
          </>
        )}
        {[TYPE_FORM.UPDATE_PASSWORD].includes(user.UserForm?.type) && (
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
    dispatch({ type: 'user/updateUserForm', payload: { type: '' } });
    form.resetFields();
    avatarRef.current?.setImageUrl('');
  };

  const renderTitle = () => {
    switch (user.UserForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.User.UserForm.Create.title',
          defaultMessage: 'Thêm mới người dùng',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.User.UserForm.Update.title',
          defaultMessage: 'Cập nhật người dùng',
        });
      case TYPE_FORM.UPDATE_PASSWORD:
        return intl.formatMessage({
          id: 'pages.Admin.User.UserForm.UpdatePassword.title',
          defaultMessage: 'Đổi mật khẩu',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (user.UserForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.User.UserForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.User.UserForm.Update.submitText',
          defaultMessage: 'Cập nhật',
        });
      case TYPE_FORM.UPDATE_PASSWORD:
        return intl.formatMessage({
          id: 'pages.Admin.User.UserForm.UpdatePassword.submitText',
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
            switch (user.UserForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createUser(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateUser(user.UserForm.itemEdit?.id || '', body);
                break;
              }
              case TYPE_FORM.UPDATE_PASSWORD: {
                delete body.avatar;
                res = await changePasswordUser(user.UserForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              user.UserList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Admin.User.UserForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE, TYPE_FORM.UPDATE_PASSWORD].includes(user.UserForm?.type)
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

export default UserForm;

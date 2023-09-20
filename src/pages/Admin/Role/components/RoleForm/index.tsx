import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { SelectColor, TextName, UploadAvatar } from '@/components/ProForm';
import { ActionAvatar } from '@/components/ProForm/ProFormAvatar/data';
import { ActionColor } from '@/components/ProForm/ProFormColor/data';
import RoleToMenuForm from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuForm';
import RoleToMenuList from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList';
import { RoleModalState } from '@/pages/Admin/Role/model';
import { createRole, updateRole } from '@/pages/Admin/Role/service';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const RoleForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const role: RoleModalState = useSelector((state: any) => state?.role);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const colorRef = useRef<ActionColor>();
  const avatarRef = useRef<ActionAvatar>();
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (role.RoleForm?.type) {
        if (role.RoleForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          avatarRef.current?.setImageUrl('');
          colorRef.current?.setColor('#fff');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(role.RoleForm?.type)) {
          form.setFieldsValue({
            ...role.RoleForm.itemEdit,
          });
          avatarRef.current?.setImageUrl(role.RoleForm.itemEdit?.avatar || '');
          colorRef.current?.setColor(role.RoleForm.itemEdit?.color || '');
        }
      }
      setModalVisible(!!role.RoleForm?.type);
    })();
  }, [role.RoleForm?.type]);

  const renderContent = () => {
    return (
      <div>
        <div className="flex justify-center">
          <div className="w-480px">
            <UploadAvatar ref={avatarRef} folder="avatar" />
            <TextName />
            <SelectColor form={form} ref={colorRef} />
          </div>
        </div>
        {role.RoleForm?.type === TYPE_FORM.UPDATE && (
          <Card>
            <RoleToMenuList />
            <RoleToMenuForm />
          </Card>
        )}
      </div>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'role/updateRoleForm', payload: { type: '' } });
    form.resetFields();
    avatarRef.current?.setImageUrl('');
    colorRef.current?.setColor('#fff');
  };

  return (
    <Modal
      width={role.RoleForm?.type === TYPE_FORM.UPDATE ? 1000 : 600}
      title={
        role.RoleForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.Admin.Role.RoleForm.Update.title',
              defaultMessage: 'Cập nhật role',
            })
          : intl.formatMessage({
              id: 'pages.Admin.Role.RoleForm.Create.title',
              defaultMessage: 'Thêm mới role',
            })
      }
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
              avatar: avatarRef.current?.getImageUrl(),
            };
            const res = await (role.RoleForm?.type === TYPE_FORM.UPDATE
              ? updateRole(role.RoleForm?.itemEdit?.id || '', body)
              : createRole(body));
            if (res) {
              onCancel();
              role.RoleList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                role.RoleForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.Admin.Role.RoleForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Admin.Role.RoleForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Admin.Role.RoleForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: role.RoleForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
          onReset={() => {
            avatarRef.current?.setImageUrl('');
            colorRef.current?.setColor('#fff');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default RoleForm;

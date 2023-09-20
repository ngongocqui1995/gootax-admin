import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { SelectColor, TextName } from '@/components/ProForm';
import { ActionColor } from '@/components/ProForm/ProFormColor/data';
import { PermissionModalState } from '@/pages/Admin/Permission/model';
import { createPermission, updatePermission } from '@/pages/Admin/Permission/service';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const PermissionForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const permission: PermissionModalState = useSelector((state: any) => state?.permission);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const colorRef = useRef<ActionColor>();
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (permission.PermissionForm?.type) {
        if (permission.PermissionForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
          colorRef.current?.setColor('#fff');
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(permission.PermissionForm?.type)) {
          form.setFieldsValue({
            ...permission.PermissionForm.itemEdit,
          });
          colorRef.current?.setColor(permission.PermissionForm.itemEdit?.color || '');
        }
      }
      setModalVisible(!!permission.PermissionForm?.type);
    })();
  }, [permission.PermissionForm?.type]);

  const renderContent = () => {
    return (
      <>
        <TextName />
        <SelectColor form={form} ref={colorRef} />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'permission/updatePermissionForm', payload: { type: '' } });
    form.resetFields();
    colorRef.current?.setColor('#fff');
  };

  return (
    <Modal
      width={600}
      title={
        permission.PermissionForm?.type === TYPE_FORM.UPDATE
          ? intl.formatMessage({
              id: 'pages.Admin.Permission.PermissionForm.Update.title',
              defaultMessage: 'Cập nhật permission',
            })
          : intl.formatMessage({
              id: 'pages.Admin.Permission.PermissionForm.Create.title',
              defaultMessage: 'Thêm mới permission',
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
              code: getKeyFromString(values.name).replace(/-/g, '_'),
            };
            const res = await (permission.PermissionForm?.type === TYPE_FORM.UPDATE
              ? updatePermission(permission.PermissionForm?.itemEdit?.id || '', body)
              : createPermission(body));
            if (res) {
              onCancel();
              permission.PermissionList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText:
                permission.PermissionForm?.type === TYPE_FORM.UPDATE
                  ? intl.formatMessage({
                      id: 'pages.Admin.Permission.PermissionForm.Update.submitText',
                      defaultMessage: 'Cập nhật',
                    })
                  : intl.formatMessage({
                      id: 'pages.Admin.Permission.PermissionForm.Create.submitText',
                      defaultMessage: 'Tạo mới',
                    }),
              resetText: intl.formatMessage({
                id: 'pages.Admin.Permission.PermissionForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: permission.PermissionForm?.type === TYPE_FORM.UPDATE ? 'hidden' : '',
            },
          }}
          onReset={() => {
            colorRef.current?.setColor('#fff');
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default PermissionForm;

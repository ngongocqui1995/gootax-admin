import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { SelectDistrict, SelectProvince, TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { WardModalState } from '../../model';
import { createWard, updateWard } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const WardForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const ward: WardModalState = useSelector((state: any) => state?.ward);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (ward.WardForm?.type) {
        if (ward.WardForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(ward.WardForm?.type)) {
          form.setFieldsValue({
            ...ward.WardForm.itemEdit,
            province: ward.WardForm.itemEdit?.province.id,
            district: ward.WardForm.itemEdit?.district.id,
          });
        }
      }
      setModalVisible(!!ward.WardForm?.type);
    })();
  }, [ward.WardForm?.type]);

  const renderContent = () => {
    if (!ward.WardForm?.type) return;
    return (
      <>
        <SelectProvince
          type={ward.WardForm?.type}
          defaultOptions={[
            {
              value: ward.WardForm.itemEdit?.province.id || '',
              label: ward.WardForm.itemEdit?.province.name || '',
            },
          ]}
          fieldProps={{
            onChange: () => {
              form.setFieldsValue({ district: undefined });
            },
          }}
        />
        <ProFormDependency name={['province']}>
          {({ province }) => {
            return (
              <SelectDistrict
                params={{ province }}
                type={ward.WardForm?.type}
                defaultOptions={[
                  {
                    value: ward.WardForm?.itemEdit?.district.id || '',
                    label: ward.WardForm?.itemEdit?.district.name || '',
                  },
                ]}
              />
            );
          }}
        </ProFormDependency>
        <TextName />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'ward/updateWardForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (ward.WardForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.Ward.WardForm.Create.title',
          defaultMessage: 'Thêm mới phường/xã',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.Ward.WardForm.Update.title',
          defaultMessage: 'Cập nhật phường/xã',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (ward.WardForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.Ward.WardForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.Ward.WardForm.Update.submitText',
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
              code: getKeyFromString(values.name),
              ...values,
            };

            let res;
            switch (ward.WardForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createWard(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateWard(ward.WardForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              ward.WardList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Admin.Ward.WardForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE].includes(ward.WardForm?.type) ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default WardForm;

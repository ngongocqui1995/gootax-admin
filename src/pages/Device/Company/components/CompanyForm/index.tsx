import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { CompanyModalState } from '../../model';
import { createCompany, updateCompany } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CompanyForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const company: CompanyModalState = useSelector((state: any) => state?.company);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (company.CompanyForm?.type) {
        if (company.CompanyForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(company.CompanyForm?.type)) {
          form.setFieldsValue({
            ...company.CompanyForm.itemEdit,
          });
        }
      }
      setModalVisible(!!company.CompanyForm?.type);
    })();
  }, [company.CompanyForm?.type]);

  const renderContent = () => {
    if (!company.CompanyForm?.type) return;
    return (
      <>
        <TextName />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'company/updateCompanyForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (company.CompanyForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.Company.CompanyForm.Create.title',
          defaultMessage: 'Thêm mới hãng xe',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.Company.CompanyForm.Update.title',
          defaultMessage: 'Cập nhật hãng xe',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (company.CompanyForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Device.Company.CompanyForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Device.Company.CompanyForm.Update.submitText',
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
            switch (company.CompanyForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createCompany(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateCompany(company.CompanyForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              company.CompanyList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Device.Company.CompanyForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE, TYPE_FORM.UPDATE_PASSWORD].includes(
                company.CompanyForm?.type,
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

export default CompanyForm;

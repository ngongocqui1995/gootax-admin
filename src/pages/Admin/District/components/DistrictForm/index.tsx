import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { DistrictModalState } from '../../model';
import { createDistrict, updateDistrict } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const DistrictForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const district: DistrictModalState = useSelector((state: any) => state?.district);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (district.DistrictForm?.type) {
        if (district.DistrictForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(district.DistrictForm?.type)) {
          form.setFieldsValue({
            ...district.DistrictForm.itemEdit,
          });
        }
      }
      setModalVisible(!!district.DistrictForm?.type);
    })();
  }, [district.DistrictForm?.type]);

  const renderContent = () => {
    if (!district.DistrictForm?.type) return;
    return (
      <>
        <TextName />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'district/updateDistrictForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (district.DistrictForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.District.DistrictForm.Create.title',
          defaultMessage: 'Thêm mới quận/huyện',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.District.DistrictForm.Update.title',
          defaultMessage: 'Cập nhật quận/huyện',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (district.DistrictForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Admin.District.DistrictForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Admin.District.DistrictForm.Update.submitText',
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
              code: getKeyFromString(values.name),
              ...values,
            };

            let res;
            switch (district.DistrictForm?.type) {
              case TYPE_FORM.CREATE: {
                res = await createDistrict(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateDistrict(district.DistrictForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              district.DistrictList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Admin.District.DistrictForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE].includes(district.DistrictForm?.type) ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default DistrictForm;

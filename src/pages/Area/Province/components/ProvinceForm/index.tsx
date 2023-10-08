import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { ProvinceModalState } from '../../model';
import { createProvince, updateProvince } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ProvinceForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const province: ProvinceModalState = useSelector((state: any) => state?.province);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (province.ProvinceForm?.type) {
        if (province.ProvinceForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(province.ProvinceForm?.type)) {
          form.setFieldsValue({
            ...province.ProvinceForm.itemEdit,
          });
        }
      }
      setModalVisible(!!province.ProvinceForm?.type);
    })();
  }, [province.ProvinceForm?.type]);

  const renderContent = () => {
    if (!province.ProvinceForm?.type) return;
    return (
      <>
        <TextName />
      </>
    );
  };

  const onCancel = () => {
    dispatch({ type: 'province/updateProvinceForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (province.ProvinceForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Area.Province.ProvinceForm.Create.title',
          defaultMessage: 'Thêm mới tỉnh/thành phố',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Area.Province.ProvinceForm.Update.title',
          defaultMessage: 'Cập nhật tỉnh/thành phố',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (province.ProvinceForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Area.Province.ProvinceForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Area.Province.ProvinceForm.Update.submitText',
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
            switch (province.ProvinceForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createProvince(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateProvince(province.ProvinceForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              province.ProvinceList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Area.Province.ProvinceForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE].includes(province.ProvinceForm?.type) ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default ProvinceForm;

import { Card, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { SelectDistrict, SelectProvince, SelectWard, TextName } from '@/components/ProForm';
import { getKeyFromString } from '@/utils/utils';
import { TYPE_FORM } from '@/utils/utils.enum';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import { useDispatch, useIntl, useSelector } from '@umijs/max';
import { RoadModalState } from '../../model';
import { createRoad, updateRoad } from '../../service';

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const RoadForm: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const road: RoadModalState = useSelector((state: any) => state?.road);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const [form] = ProForm.useForm();

  useEffect(() => {
    (function () {
      if (road.RoadForm?.type) {
        if (road.RoadForm?.type === TYPE_FORM.CREATE) {
          form.resetFields();
        }
        if ([TYPE_FORM.UPDATE, TYPE_FORM.COPY].includes(road.RoadForm?.type)) {
          form.setFieldsValue({
            ...road.RoadForm.itemEdit,
            province: road.RoadForm.itemEdit?.province.id,
            district: road.RoadForm.itemEdit?.district.id,
            ward: road.RoadForm.itemEdit?.ward.id,
          });
        }
      }
      setModalVisible(!!road.RoadForm?.type);
    })();
  }, [road.RoadForm?.type]);

  const renderContent = () => {
    if (!road.RoadForm?.type) return;
    return (
      <>
        <SelectProvince
          type={road.RoadForm?.type}
          defaultOptions={[
            {
              value: road.RoadForm.itemEdit?.province.id || '',
              label: road.RoadForm.itemEdit?.province.name || '',
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
                type={road.RoadForm?.type}
                defaultOptions={[
                  {
                    value: road.RoadForm?.itemEdit?.district.id || '',
                    label: road.RoadForm?.itemEdit?.district.name || '',
                  },
                ]}
              />
            );
          }}
        </ProFormDependency>
        <ProFormDependency name={['province', 'district']}>
          {({ province, district }) => {
            return (
              <SelectWard
                params={{ province, district }}
                type={road.RoadForm?.type}
                defaultOptions={[
                  {
                    value: road.RoadForm?.itemEdit?.ward.id || '',
                    label: road.RoadForm?.itemEdit?.ward.name || '',
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
    dispatch({ type: 'road/updateRoadForm', payload: { type: '' } });
    form.resetFields();
  };

  const renderTitle = () => {
    switch (road.RoadForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Area.Road.RoadForm.Create.title',
          defaultMessage: 'Thêm mới phường/xã',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Area.Road.RoadForm.Update.title',
          defaultMessage: 'Cập nhật phường/xã',
        });
      default:
        return '';
    }
  };

  const renderSubmitText = () => {
    switch (road.RoadForm?.type) {
      case TYPE_FORM.CREATE:
      case TYPE_FORM.COPY:
        return intl.formatMessage({
          id: 'pages.Area.Road.RoadForm.Create.submitText',
          defaultMessage: 'Tạo mới',
        });
      case TYPE_FORM.UPDATE:
        return intl.formatMessage({
          id: 'pages.Area.Road.RoadForm.Update.submitText',
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
            switch (road.RoadForm?.type) {
              case TYPE_FORM.COPY:
              case TYPE_FORM.CREATE: {
                res = await createRoad(body);
                break;
              }
              case TYPE_FORM.UPDATE: {
                res = await updateRoad(road.RoadForm.itemEdit?.id || '', body);
                break;
              }
            }
            if (res) {
              onCancel();
              road.RoadList?.reload?.();
            }
          }}
          submitter={{
            render: (_, dom) => <Space className={'flex justify-end mt-4'}>{dom}</Space>,
            searchConfig: {
              submitText: renderSubmitText(),
              resetText: intl.formatMessage({
                id: 'pages.Area.Road.RoadForm.resetText',
                defaultMessage: 'Làm mới',
              }),
            },
            resetButtonProps: {
              className: [TYPE_FORM.UPDATE].includes(road.RoadForm?.type) ? 'hidden' : '',
            },
          }}
        >
          <Card>{renderContent()}</Card>
        </ProForm>
      </div>
    </Modal>
  );
};

export default RoadForm;

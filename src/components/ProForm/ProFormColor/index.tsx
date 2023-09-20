import { Form, FormInstance, Modal, Tag } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
// @ts-ignore
import { useIntl } from '@umijs/max';
import { ColorResult, SketchPicker } from 'react-color';

interface ProFormColorProps {
  form: FormInstance<any>;
  ref: any;
}

const ProFormColor: React.FC<ProFormColorProps> = forwardRef(({ form }, ref) => {
  const [color, setColor] = useState('#fff');
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const intl = useIntl();

  useImperativeHandle(ref, () => ({
    setColor,
  }));

  const handleChange = (value: ColorResult) => {
    setColor(value.hex);
  };

  const handleClick = () => {
    setOpenColorPicker(!openColorPicker);
  };

  return (
    <div>
      <Form.Item
        name="color"
        label={intl.formatMessage({ id: 'pages.color', defaultMessage: 'Màu sắc' })}
      >
        <div>
          <Tag
            className={'cursor-pointer h-[32px] w-[60px]'}
            onClick={handleClick}
            color={form.getFieldValue('color')}
          />
          <Modal
            title={intl.formatMessage({
              id: 'pages.color.placeholder',
              defaultMessage: 'Chọn màu sắc',
            })}
            width={270}
            visible={openColorPicker}
            onCancel={() => {
              if (form.getFieldValue('color')) {
                setColor(form.getFieldValue('color'));
              }
              handleClick();
            }}
            onOk={() => {
              form.setFieldsValue({ color });
              handleClick();
            }}
          >
            <SketchPicker color={color} onChange={handleChange} />
          </Modal>
        </div>
      </Form.Item>
    </div>
  );
});

export default ProFormColor;

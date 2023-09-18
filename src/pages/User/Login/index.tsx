import logo from '@/assets/logo.png';
import { getSettingDrawer } from '@/utils/handler';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useDispatch, useModel } from '@umijs/max';
import React from 'react';
import TaxiBg from './components/TaxiBackground';

const Login: React.FC = () => {
  const [submitting, setSubmitting] = React.useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const dispatch = useDispatch();
  const [form] = ProForm.useForm();
  const settingDrawer = getSettingDrawer();
  const setting = { ...initialState?.settings, ...settingDrawer };

  const handleSubmit = async (values) => {};

  const rootClassName = useEmotionCss(() => {
    return {
      height: '100%',
      '.ant-pro-form-login-page-notice': {
        backgroundColor:
          setting?.navTheme === 'realDark' ? '#000000' : initialState?.settings?.token?.bgLayout,
      },
      '.ant-pro-form-login-page-container': {
        backgroundColor:
          setting?.navTheme === 'realDark' ? '#000000' : initialState?.settings?.token?.bgLayout,
      },
      '.ant-pro-form-login-page-desc': {
        color: setting?.colorPrimary,
      },
      '.title-login': {
        marginBottom: 10,
        textAlign: 'center',
        color: setting?.colorPrimary,
      },
      '.ant-input-affix-wrapper': {
        backgroundColor: initialState?.settings?.token?.bgLayout,
        svg: {
          color: setting?.colorPrimary,
        },
        input: {
          backgroundColor: `${initialState?.settings?.token?.bgLayout} !important`,
        },
      },
      '.remember-password': {
        color: setting?.colorPrimary,
      },
      '.forget-password': {
        color: setting?.colorPrimary,
        float: 'right',
      },
      '.ant-checkbox': {
        '.ant-checkbox-inner': {
          backgroundColor: `${setting?.colorPrimary} !important`,
          borderColor: `${setting?.colorPrimary} !important`,
        },
        '&:hover .ant-checkbox-inner': {
          backgroundColor: `${setting?.colorPrimary} !important`,
          borderColor: `transparent !important`,
        },
      },
      '.btn-login': {
        backgroundColor: setting?.colorPrimary,
        '&:hover': {
          backgroundColor: `${setting?.colorPrimary} !important`,
        },
      },
    };
  });

  return (
    <div className={rootClassName}>
      <LoginFormPage
        form={form}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        title={(<img src={logo} style={{ width: 200, height: 50 }} />) as any}
        subTitle={<p>Tổng đài đặt xe taxi</p>}
        initialValues={{
          autoLogin: true,
        }}
        onFinish={async (values: LoginParamsType) => {
          await handleSubmit(values);
        }}
        activityConfig={{
          style: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          action: (
            <div className="bg-login">
              <TaxiBg />
            </div>
          ),
        }}
        submitter={{
          searchConfig: { submitText: 'Đăng nhập' },
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: { width: '100%' },
            className: 'btn-login',
          },
        }}
      >
        <div className="title-login">
          <h1>Đăng nhập</h1>
        </div>
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined />,
            maxLength: 12,
          }}
          placeholder="Nhập vào tài khoản."
          rules={[{ required: true, message: 'Tài khoản là bắt buộc!' }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
            maxLength: 6,
          }}
          placeholder="Nhập mật khẩu."
          rules={[{ required: true, message: 'Mật khẩu là bắt buộc!' }]}
        />
        <div style={{ marginBlockEnd: 24 }}>
          <ProFormCheckbox noStyle name="autoLogin">
            <a className="remember-password">Nhớ mật khẩu</a>
          </ProFormCheckbox>
          <a className="forget-password">Quên mật khẩu</a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;

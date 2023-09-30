import logo from '@/assets/logo.png';
import { getSettingDrawer } from '@/utils/handler';
import { saveToken } from '@/utils/utils';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useIntl, useModel } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import TaxiBg from './components/TaxiBackground';
import { UserLogin } from './data';
import { getProfile, login } from './services';

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query || {};
    history.push(redirect || '/admin');
  }, 10);
};

const Login: React.FC = () => {
  const [loginSubmitting, setLoginSubmitting] = React.useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = ProForm.useForm();
  const settingDrawer = getSettingDrawer();
  const setting = { ...initialState?.settings, ...settingDrawer };
  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await getProfile();

    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
      message.success(
        intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Đăng nhập thành công!',
        }),
      );
      goto();
    }
  };

  const handleLoginSubmit = async (values: UserLogin.LoginParams) => {
    setLoginSubmitting(true);
    const res = await login({
      email: values.username,
      password: values.password,
    });
    setLoginSubmitting(false);

    if (!res) return;
    saveToken(res?.token);
    await fetchUserInfo();
  };

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
        color: setting?.colorPrimary || 'black',
      },
      '.title-login': {
        marginBottom: 10,
        textAlign: 'center',
        color: setting?.colorPrimary || 'black',
      },
      '.ant-input-affix-wrapper': {
        backgroundColor: initialState?.settings?.token?.bgLayout,
        svg: {
          color: setting?.colorPrimary || 'black',
        },
        input: {
          backgroundColor: `${initialState?.settings?.token?.bgLayout} !important`,
        },
      },
      '.remember-password': {
        color: setting?.colorPrimary || 'black',
      },
      '.forget-password': {
        color: setting?.colorPrimary || 'black',
        float: 'right',
      },
      '.ant-checkbox': {
        '.ant-checkbox-inner': {
          backgroundColor: `${setting?.colorPrimary || 'black'} !important`,
          borderColor: `${setting?.colorPrimary || 'black'} !important`,
        },
        '&:hover .ant-checkbox-inner': {
          backgroundColor: `${setting?.colorPrimary || 'black'} !important`,
          borderColor: `transparent !important`,
        },
      },
      '.btn-login': {
        backgroundColor: setting?.colorPrimary || 'black',
        '&:hover': {
          backgroundColor: `${setting?.colorPrimary || 'black'} !important`,
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
        onFinish={async (values: UserLogin.LoginParams) => {
          await handleLoginSubmit(values);
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
            loading: loginSubmitting,
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
          }}
          placeholder="Nhập vào tài khoản."
          rules={[{ required: true, message: 'Tài khoản là bắt buộc!' }]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
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

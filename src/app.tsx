import { AvatarDropdown, AvatarName } from '@/components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
// @ts-ignore
import { history, Link, RunTimeLayoutConfig } from '@umijs/max';
import { Space } from 'antd';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import { AvatarIcon } from './components/RightContent/AvatarDropdown';
import { SuperNoFoundPage, SuperUnAccessiblePage } from './components/SuperErrorPage';
import SuperErrorBoundary from './components/SuperErrorPage/SuperErrorBoundary';
import { getProfile } from './pages/User/Login/services';
import { errorConfig } from './requestErrorConfig';
import { getSettingDrawer } from './utils/handler';
import { getToken, importLocale, removeToken } from './utils/utils';

const loginPath = '/user/login';
const homePath = '/';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  importLocale();

  const fetchUserInfo = async () => {
    if (!getToken()) return undefined;
    try {
      const currentUser = await getProfile();
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const currentUser = await fetchUserInfo?.();
  if (!currentUser) {
    removeToken();
    history.push(loginPath);
    return { fetchUserInfo, currentUser: undefined, settings: {} };
  }

  if (history.location.pathname === '/user/login' && currentUser) history.push('/admin/users');
  return {
    fetchUserInfo,
    currentUser,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    actionsRender: () => [],
    title: 'GooTax',
    logo: '/logo.svg',
    avatarProps: {
      src: () => initialState?.currentUser?.avatar,
      title: <AvatarName />,
      icon: <AvatarIcon />,
      size: 'small',
      style: !initialState?.currentUser?.avatar && {
        verticalAlign: 'center',
        backgroundColor: '#f56a00',
      },
      gap: 4,
      render: (
        _: any,
        avatarChildren:
          | string
          | number
          | boolean
          | ReactElement<any, string | JSXElementConstructor<any>>
          | Iterable<ReactNode>
          | ReactPortal
          | null
          | undefined,
      ) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: '', // waterMark empty
    },
    contentStyle: { padding: 0 },
    onPageChange: () => {
      const { location } = history;
      // get token
      const token = getToken();
      // No token, redirect to login page
      if (!token && location.pathname !== loginPath) {
        history.push(loginPath);
      }
      // Existed token, redirect to home page
      if (token && location.pathname === loginPath) {
        history.push(homePath);
      }
    },
    className: 'layout-sidebar',
    menuHeaderRender: undefined,
    headerTitleRender: (logo: any) => <a>{logo}</a>,
    // Tùy chỉnh 403 trang
    // unAccessible: <div>unAccessible</div>,
    // cộng một loading trạng thái
    childrenRender: (children) => {
      return (
        <>
          {children}
          {/* <SettingDrawer
            disableUrlParams
            enableDarkTheme
            hideCopyButton
            hideHintAlert
            settings={{
              ...initialState?.settings,
              ...getSettingDrawer(),
            }}
            onSettingChange={(settings) => {
              saveSettingDrawer(settings);
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings: {
                  ...settings,
                  ...getSettingDrawer(),
                },
              }));
            }}
          /> */}
        </>
      );
    },
    menuItemRender: (
      menuItemProps: { isUrl: any; children: any; path: any },
      defaultDom:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | null
        | undefined,
    ) => {
      if (menuItemProps.isUrl || menuItemProps.children) {
        return defaultDom;
      }

      if (menuItemProps.path) {
        return (
          <Link to={menuItemProps.path}>
            <Space>
              {/* {menuItemProps?.icon} */}
              {defaultDom}
            </Space>
          </Link>
        );
      }

      return defaultDom;
    },
    ErrorBoundary: SuperErrorBoundary,
    unAccessible: <SuperUnAccessiblePage />,
    noFound: <SuperNoFoundPage />,
    ...{
      ...initialState?.settings,
      ...getSettingDrawer(),
    },
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};

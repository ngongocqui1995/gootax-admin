import { getSettingDrawer } from '@/utils/handler';
import { removeLocalStorage } from '@/utils/utils';
import { LogoutOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Avatar, Spin, message } from 'antd';
import { stringify } from 'querystring';
import { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const settingDrawer = getSettingDrawer();
  const { layout } = settingDrawer;

  const avatarNameClassName = useEmotionCss(() => {
    if (layout === 'top')
      return {
        marginRight: 8,
        color: 'white',
        [`@media screen and (max-width: 450px)`]: {
          display: 'none',
        },
      };
    else
      return {
        marginRight: 8,
        maxHeight: 100,
        maxWidth: 115,
        color: 'black',
        [`@media screen and (max-width: 450px)`]: {
          display: 'none',
        },
      };
  });

  return <span className={avatarNameClassName}>{currentUser?.name}</span>;
};

export const AvatarIcon = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  if (currentUser?.avatar) return <Avatar src={currentUser.avatar} />;
  return <>{currentUser?.name?.charAt(0)}</>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const settingDrawer = getSettingDrawer();
  const { layout } = settingDrawer;

  const loginOut = async () => {
    message.loading('Đang xử  lý...');
    // set initial state
    flushSync(() => {
      setInitialState((s) => ({ ...s, currentUser: undefined }));
    });
    // await to(outLogin());

    // remove local storage
    removeLocalStorage();

    message.destroy();
    // redirect to login page
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** redirect */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        await loginOut();
        return;
      }
      history.push(`/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }
  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Thoát',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
      placement={layout === 'top' ? 'bottomCenter' : 'topLeft'}
    >
      {children}
    </HeaderDropdown>
  );
};

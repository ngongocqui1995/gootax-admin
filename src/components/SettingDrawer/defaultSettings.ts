import type { MenuDataItem } from '@umijs/route-utils';

export type ContentWidth = 'Fluid' | 'Fixed';

export type RenderSetting = {
  headerRender?: false;
  footerRender?: false;
  menuRender?: false;
  menuHeaderRender?: false;
};
export type PureSettings = {
  /**
   * @name theme for nav menu
   *
   * @type  "light" | "dark" | "realDark"
   */
  navTheme?: 'realDark' | 'light';

  /**
   * @name layout
   * @type  'side' | 'top' | 'mix'
   *
   * @example layout="top"
   * @example layout="side"
   * @example layout="mix"
   */
  layout?: 'side' | 'top' | 'mix';
  /** @name layout of content: `Fluid` or `Fixed`, only works when layout is top */
  contentWidth?: ContentWidth;
  /** @name sticky header */
  fixedHeader?: boolean;
  /** @name sticky siderbar */
  fixSiderbar?: boolean;
  /**
   * @name menu
   *
   * @example menu={{ locale: false }}
   * @example menu={{ defaultOpenAll:true }}
   * @example loading menu={{ loading: true }}
   * @example menu={{params:{ pathname } request: async (params) => { return [{name:"",path=params.pathname}]} }}
   * @example MenuGroup menu={{ mode: 'group' }}
   * @example menu={{ autoClose: false }}
   * @example menu={{ ignoreFlatMenu: true }}
   */
  menu?: {
    /**
     * @name
     */
    locale?: boolean;
    hideMenuWhenCollapsed?: boolean;
    /**
     *
     */
    collapsedShowTitle?: boolean;
    /**
     *
     */
    collapsedShowGroupTitle?: boolean;
    /**
     * @name
     */
    defaultOpenAll?: boolean;
    /**
     * @name
     */
    ignoreFlatMenu?: boolean;

    /**
     * @name loading
     */
    loading?: boolean;
    /**
     * @name loading
     */
    onLoadingChange?: (loading?: boolean) => void;

    /**
     * @name params request
     *
     */
    params?: Record<string, any>;

    /**
     * @name params request
     */
    request?: (
      params: Record<string, any>,
      defaultMenuData: MenuDataItem[],
    ) => Promise<MenuDataItem[]>;

    /**
     * @name
     */
    type?: 'sub' | 'group';
    /**
     * @name
     */
    autoClose?: false;
  };
  /**
   * false, layout pageName - title
   *
   * @name Layout title
   */
  title?: string | false;
  /**
   * Your custom iconfont Symbol script Url eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
   * Iconfont Usage: https://github.com/ant-design/ant-design-pro/pull/3517
   */
  iconfontUrl?: string;
  /** @name umi */
  colorPrimary?: string;
  /** @name */
  colorWeak?: boolean;
  /**
   * mix
   *
   * @name
   */
  splitMenus?: boolean;
  /**
   * @name Sider
   */
  suppressSiderWhenMenuEmpty?: boolean;
  /**
   *
   */
  siderMenuType?: 'sub' | 'group';

  token: any;
};

export type ProSettings = PureSettings & RenderSetting;

const defaultSettings: ProSettings = {
  navTheme: 'light',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  iconfontUrl: '',
  colorPrimary: '#1677FF',
  splitMenus: false,
  token: {},
};
export { defaultSettings };

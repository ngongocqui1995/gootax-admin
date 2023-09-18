// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name hash
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: false,
  /**
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @doc https://ant.design/docs/react/customize-theme-cn
   * @doc https://umijs.org/docs/api/config#theme
   */
  theme: {
    'root-entry-name': 'variable',
  },
  /**
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @doc https://umijs.org/docs/guides/proxy
   * @doc https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  /**
   * @doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name layout
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'Salesman',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default vi-VN
    default: 'vi-VN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  metas: [
    { name: 'keywords', content: 'gootax' },
    {
      name: 'description',
      content: 'Ứng dụng đặt xe taxi hàng đầu việt nam',
    },
  ],

  headScripts: [{ src: '/scripts/loading.js', async: true }],
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    // {
    //   requestLibPath: "import { request } from '@umijs/max'",
    //   schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
    //   projectName: 'swagger',
    // },
  ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
  dva: {},
  manifest: {
    basePath: '/',
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || '',
  },
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  publicPath: '/',
  exportStatic: {},
  cacheDirectoryPath: '.cache',
});

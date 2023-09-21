import { isBrowser } from '@ant-design/pro-utils';
import enUSLocal from '../../locales/en-US';
import viVNLocal from '../../locales/vi-VN';

const locales: Record<string, any> = {
  'en-US': enUSLocal,
  'vi-VN': viVNLocal,
};

const themeConfig: Record<string, any> = {
  techBlue: '#1677FF',
  daybreak: '#1890ff',
  dust: '#F5222D',
  volcano: '#FA541C',
  sunset: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  geekblue: '#2F54EB',
  purple: '#722ED1',
};

type GLocaleWindow = {
  g_locale: keyof typeof locales;
};

export type LocaleType = keyof typeof locales;

export const getLanguage = (): string => {
  // support ssr
  if (!isBrowser()) return 'vi-VN';
  const lang = window.localStorage.getItem('umi_locale');
  return lang || (window as unknown as GLocaleWindow).g_locale; // || navigator.language;
};

export const gLocaleObject = (): Record<string, string> => {
  const gLocale = getLanguage();
  return locales[gLocale] || locales['vi-VN'];
};

/**
 * Daybreak-> #1890ff
 *
 * @param val
 */
export function genStringToTheme(val?: string): string {
  return val && themeConfig[val] ? themeConfig[val] : val;
}

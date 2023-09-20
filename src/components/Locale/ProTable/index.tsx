import { createIntl, IntlProvider } from '@ant-design/pro-table';
import React from 'react';
// @ts-ignore
import enUS from '@/locales/en-US/proTable';
import viVN from '@/locales/vi-VN/proTable';
import { getLocale } from '@umijs/max';

interface LocaleProTableProps {
  localeVN?: any;
  localeEN?: any;
}

const LocaleProTable: React.FC<LocaleProTableProps> = ({ localeVN, localeEN, children }) => {
  const viVNIntl = createIntl('vi_VN', localeVN || viVN);
  const enUSIntl = createIntl('en-US', localeEN || enUS);

  const intlMap = {
    'vi-VN': viVNIntl,
    'en-US': enUSIntl,
  };

  return (
    <IntlProvider value={{ intl: intlMap[getLocale()], valueTypeMap: {} }}>{children}</IntlProvider>
  );
};

export default LocaleProTable;

/**
 * save settings of drawer
 * @param values
 */
const saveSettingDrawer = (values: any) => {
  localStorage.setItem('setting_drawer', JSON.stringify(values));
};

/**
 * get all settings of drawer
 * @returns
 */
const getSettingDrawer = () => {
  const settings = localStorage.getItem('setting_drawer') || '';

  if (!settings) return {};

  return JSON.parse(settings);
};

export { getSettingDrawer, saveSettingDrawer };

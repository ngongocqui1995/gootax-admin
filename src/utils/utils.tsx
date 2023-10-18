import {
  defaultLangUConfigMap,
  genderEnum,
  localesData,
  PHONE_PROVIDER,
  statusAutoUploadEnum,
  statusEnum,
  typeMenuEnum,
  typeUploadEnum,
} from '@/utils/utils.enum';
import lodash from 'lodash';
import { decrypt, encrypt } from '../../crypto';
// @ts-ignore
import { FormattedMessage, useIntl } from '@umijs/max';

export const isUrl = (path: string): boolean => {
  /* eslint-disable no-useless-escape */
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};

export const regSpecialCharacter =
  /`|~|!|@|#|\$|%|\^|&|\*|\+|=|\[|{|]|}|\||\\|'|<|,|>|\?|\/|""|;|:/; // special character: .

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

export const regPhoneNumber = /(0)+([0-9]{9})\b/;

export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const invalidPhoneProvider = (numPhone: string): boolean => {
  const num_provider = numPhone.slice(0, 3);
  return !PHONE_PROVIDER.allProvider.includes(num_provider);
};

export const getLocales = () => {
  return localesData.map((it) => defaultLangUConfigMap[it]);
};

export const validationPassWord = (_: any, value: string) => {
  const reg = new RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/, 'i');
  if (reg.test(value) || !value) {
    return Promise.resolve();
  }
  return Promise.reject(
    new Error('Mật khẩu phải có 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 kí tự đặc biệt!'),
  );
};

/** Remove localStorage */
export const removeLocalStorage = () => {
  const isNotifyFirebase = localStorage.getItem('notify_firebase');
  const isWatchedIntro = localStorage.getItem('watched_intro');
  const settingDrawer = localStorage.getItem('setting_drawer');
  const locale = localStorage.getItem('umi_locale');

  localStorage.clear();

  // NOTE: except fields
  // reset - watched intro
  if (isWatchedIntro) localStorage.setItem('watched_intro', 'true');
  if (settingDrawer) localStorage.setItem('setting_drawer', settingDrawer);
  if (isNotifyFirebase) localStorage.setItem('notify_firebase', 'true');
  if (locale) localStorage.setItem('umi_locale', locale);
};

export const joinConverter = (params: object, join_params: object = {}): string => {
  let newString = '';
  const newArray: any[] = [];
  if (!params) return newString;

  lodash.forOwn(params, (value, key) => {
    if (join_params[key] && Array.isArray(join_params[key])) {
      let stringJoin = '';
      join_params[key].forEach(
        (it: { condition: string; key: string; joinWith: string }, index: number) => {
          if (index === 0 && !lodash.isEmpty(value)) stringJoin += 'filter=';
          if (it.condition === '$isnull' || it.condition === '$notnull') {
            if (index === 0) stringJoin += 'filter=';
            stringJoin += `${it.key}||${it.condition}`;
          } else if (!lodash.isEmpty(value)) {
            stringJoin += `${it.key}||${it.condition}||${value}`;
          }
          if (it.joinWith) stringJoin += it.joinWith;
        },
      );
      newArray.push(stringJoin);
    }

    if (key === 'join') {
      String(value)
        .split(',')
        .forEach((it) => {
          newArray.push(`join=${it}`);
        });
    }

    if (
      value &&
      key !== 'join' &&
      key !== 'current' &&
      key !== 'pageSize' &&
      key !== 'keyword' &&
      !join_params[key]
    ) {
      newArray.push(`filter=${key}||$eq||${value}`);
    }
  });

  newArray.forEach((it, index, array) => {
    if (index === array.length - 1) newString += it;
    if (index !== array.length - 1) newString += `${it}&`;
  });

  return newString;
};

export const paramsConverter = (
  params: object,
  join_params: object,
  keyword_params: string,
): object => {
  const newObj: any = {};
  const keywords: any = [];
  const searchAnd: any = [];
  if (!params) return newObj;

  lodash.forOwn(params, (value, key) => {
    if (key === 'current') newObj.page = value;
    if (key === 'pageSize') newObj.limit = value;
    if (key === 'join') newObj.join = value;
    if (value && !join_params[key]) newObj[key] = value;

    if (join_params[key] && Array.isArray(join_params[key])) {
      join_params[key].forEach((it: { condition: string; key: string; joinWith: string }) => {
        searchAnd.push({ [it.key]: { [it.condition]: value } });
      });
    }
  });

  if (params['keyword']) {
    const listParams = keyword_params.split(',');
    listParams.forEach((it) => {
      keywords.push({ [it]: { $contL: String(params['keyword']).trim() } });
    });
  }

  if (keywords.length > 0) {
    newObj['s'] = { $and: [...searchAnd, { $or: keywords }] };
  }
  return newObj;
};

export const removeParamsEmpty = (params: object) => {
  const newObj: any = {};
  if (!params) return newObj;
  lodash.forOwn(params, (value, key) => {
    if (!value) newObj[key] = null;
    if (value || lodash.isNumber(value)) newObj[key] = value;
  });
  return newObj;
};

export const sortConverter = (sort: object): string => {
  let newString = '';
  const newArray: any[] = [];
  if (!sort) return newString;

  lodash.forOwn(sort, (value, key) => {
    if (value === 'ascend') newArray.push(`sort=${key},ASC`);
    if (value === 'descend') newArray.push(`sort=${key},DESC`);
  });

  newArray.forEach((it, index, array) => {
    if (index === array.length - 1) newString += it;
    if (index !== array.length - 1) newString += `${it}&`;
  });

  return newString;
};

export const phoneFormatter = (phone: string): string => {
  if (!phone) return '';
  if (lodash.isNaN(+phone)) return phone;
  let numberPhone = String(phone).replace(/[^\d]/g, '');
  numberPhone = numberPhone.replace(/(\d{3})(\d{3})(\d)/, '$1 $2 $3');
  return numberPhone;
};

export const saveToken = (data: string) => {
  if (!data) return;
  const encryptedData = encrypt(data);
  localStorage.setItem('token', encryptedData);
};

export const PAGINATE_OPTIONS = {
  defaultPageSize: 20,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50'],
};

export const scrollTable = { x: 'max-content' };

export const getTypeMenuEnum = () => {
  const newObj: any = {};
  // @ts-ignore
  const intl = useIntl();
  lodash.forOwn(typeMenuEnum, (value, key) => {
    newObj[key] = {
      ...value,
      text: intl.formatMessage({ id: value.id, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const getTypeUpload = () => {
  const newObj: any = {};
  // @ts-ignore
  const intl = useIntl();
  lodash.forOwn(typeUploadEnum, (value, key) => {
    newObj[key] = {
      ...value,
      text: intl.formatMessage({ id: value.id, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const getGenderEnum = () => {
  const newObj: any = {};
  // @ts-ignore
  const intl = useIntl();
  lodash.forOwn(genderEnum, (value, key) => {
    newObj[key] = {
      ...value,
      text: intl.formatMessage({ id: value.id, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const getStatusAutoUploadEnum = () => {
  const newObj: any = {};
  // @ts-ignore
  const intl = useIntl();
  lodash.forOwn(statusAutoUploadEnum, (value, key) => {
    newObj[key] = {
      ...value,
      text: intl.formatMessage({ id: value.id, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const getStatusEnum = (enums: any = statusEnum) => {
  const newObj: any = {};
  // @ts-ignore
  const intl = useIntl();
  lodash.forOwn(enums, (value, key) => {
    newObj[key] = {
      ...value,
      text: intl.formatMessage({ id: value.id, defaultMessage: value.text }),
    };
  });
  return newObj;
};

export const getToken = (): string => {
  let token = '';
  const encryptedData = localStorage.getItem('token');
  if (encryptedData) token = decrypt(encryptedData);
  return token;
};

export const importLocale = () => {
  const locale = localStorage.getItem('umi_locale');
  if (!locale) localStorage.setItem('umi_locale', 'vi-VN');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getUpdateTooltip = () => {
  return (
    <FormattedMessage id="pages.buttons.Update.tooltip" defaultMessage="Nhấp vào để chỉnh sửa" />
  );
};

export const getUpdatePasswordTooltip = () => {
  return (
    <FormattedMessage
      id="pages.buttons.UpdatePassword.tooltip"
      defaultMessage="Nhấp vào để cập nhật mật khẩu"
    />
  );
};

export const getCopyTooltip = () => {
  return <FormattedMessage id="pages.buttons.Copy.tooltip" defaultMessage="Nhấp vào để sao chép" />;
};

export const getDeleteTooltip = () => {
  return <FormattedMessage id="pages.buttons.Delete.tooltip" defaultMessage="Nhấp vào để xoá" />;
};

export const getPopupConfirmDelete = () => {
  return (
    <FormattedMessage
      id="pages.buttons.Delete.confirm"
      defaultMessage="Bạn có chắc chắn muốn xoá không?"
    />
  );
};

export const getKeyFromString = (str: string, upperCase: boolean = true) => {
  let data = String(str);
  if (!str) return '';
  data = data.toLowerCase();
  data = data.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  data = data.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  data = data.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  data = data.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  data = data.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  data = data.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  data = data.replace(/đ/g, 'd');
  data = data.replace(
    /”|“|!|@|%|^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\\/g,
    ' ',
  );
  data = data.replace('[', '');
  data = data.replace(/ + /g, ' ');
  data = data.replace(/-+-/g, '-');
  data = data.replace(/ – /g, ' ');
  data = data.trim();
  data = data.replace(/ /g, '-');
  if (upperCase) data = data.toUpperCase();
  return data;
};

export const FALLBACK_STRING =
  'data:image/png;base64,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';

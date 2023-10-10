const defaultLangUConfigMap = {
  'ar-EG': {
    lang: 'ar-EG',
    label: 'العربية',
    icon: '🇪🇬',
    title: 'لغة',
  },
  'az-AZ': {
    lang: 'az-AZ',
    label: 'Azərbaycan dili',
    icon: '🇦🇿',
    title: 'Dil',
  },
  'bg-BG': {
    lang: 'bg-BG',
    label: 'Български език',
    icon: '🇧🇬',
    title: 'език',
  },
  'ca-ES': {
    lang: 'ca-ES',
    label: 'Catalá',
    icon: '🇨🇦',
    title: 'llengua',
  },
  'cs-CZ': {
    lang: 'cs-CZ',
    label: 'Čeština',
    icon: '🇨🇿',
    title: 'Jazyk',
  },
  'da-DK': {
    lang: 'da-DK',
    label: 'Dansk',
    icon: '🇩🇰',
    title: 'Sprog',
  },
  'de-DE': {
    lang: 'de-DE',
    label: 'Deutsch',
    icon: '🇩🇪',
    title: 'Sprache',
  },
  'el-GR': {
    lang: 'el-GR',
    label: 'Ελληνικά',
    icon: '🇬🇷',
    title: 'Γλώσσα',
  },
  'en-GB': {
    lang: 'en-GB',
    label: 'English',
    icon: '🇬🇧',
    title: 'Language',
  },
  'en-US': {
    lang: 'en-US',
    label: 'English',
    icon: '🇺🇸',
    title: 'Language',
  },
  'es-ES': {
    lang: 'es-ES',
    label: 'Español',
    icon: '🇪🇸',
    title: 'Idioma',
  },
  'et-EE': {
    lang: 'et-EE',
    label: 'Eesti',
    icon: '🇪🇪',
    title: 'Keel',
  },
  'fa-IR': {
    lang: 'fa-IR',
    label: 'فارسی',
    icon: '🇮🇷',
    title: 'زبان',
  },
  'fi-FI': {
    lang: 'fi-FI',
    label: 'Suomi',
    icon: '🇫🇮',
    title: 'Kieli',
  },
  'fr-BE': {
    lang: 'fr-BE',
    label: 'Français',
    icon: '🇧🇪',
    title: 'Langue',
  },
  'fr-FR': {
    lang: 'fr-FR',
    label: 'Français',
    icon: '🇫🇷',
    title: 'Langue',
  },
  'ga-IE': {
    lang: 'ga-IE',
    label: 'Gaeilge',
    icon: '🇮🇪',
    title: 'Teanga',
  },
  'he-IL': {
    lang: 'he-IL',
    label: 'עברית',
    icon: '🇮🇱',
    title: 'שפה',
  },
  'hi-IN': {
    lang: 'hi-IN',
    label: 'हिन्दी, हिंदी',
    icon: '🇮🇳',
    title: 'भाषा: हिन्दी',
  },
  'hr-HR': {
    lang: 'hr-HR',
    label: 'Hrvatski jezik',
    icon: '🇭🇷',
    title: 'Jezik',
  },
  'hu-HU': {
    lang: 'hu-HU',
    label: 'Magyar',
    icon: '🇭🇺',
    title: 'Nyelv',
  },
  'hy-AM': {
    lang: 'hu-HU',
    label: 'Հայերեն',
    icon: '🇦🇲',
    title: 'Լեզու',
  },
  'id-ID': {
    lang: 'id-ID',
    label: 'Bahasa Indonesia',
    icon: '🇮🇩',
    title: 'Bahasa',
  },
  'it-IT': {
    lang: 'it-IT',
    label: 'Italiano',
    icon: '🇮🇹',
    title: 'Linguaggio',
  },
  'is-IS': {
    lang: 'is-IS',
    label: 'Íslenska',
    icon: '🇮🇸',
    title: 'Tungumál',
  },
  'ja-JP': {
    lang: 'ja-JP',
    label: '日本語',
    icon: '🇯🇵',
    title: '言語',
  },
  'ku-IQ': {
    lang: 'ku-IQ',
    label: 'کوردی',
    icon: '🇮🇶',
    title: 'Ziman',
  },
  'kn-IN': {
    lang: 'zh-TW',
    label: 'ಕನ್ನಡ',
    icon: '🇮🇳',
    title: 'ಭಾಷೆ',
  },
  'ko-KR': {
    lang: 'ko-KR',
    label: '한국어',
    icon: '🇰🇷',
    title: '언어',
  },
  'lv-LV': {
    lang: 'lv-LV',
    label: 'Latviešu valoda',
    icon: '🇱🇮',
    title: 'Kalba',
  },
  'mk-MK': {
    lang: 'mk-MK',
    label: 'македонски јазик',
    icon: '🇲🇰',
    title: 'Јазик',
  },
  'mn-MN': {
    lang: 'mn-MN',
    label: 'Монгол хэл',
    icon: '🇲🇳',
    title: 'Хэл',
  },
  'ms-MY': {
    lang: 'ms-MY',
    label: 'بهاس ملايو‎',
    icon: '🇲🇾',
    title: 'Bahasa',
  },
  'nb-NO': {
    lang: 'nb-NO',
    label: 'Norsk',
    icon: '🇳🇴',
    title: 'Språk',
  },
  'ne-NP': {
    lang: 'ne-NP',
    label: 'नेपाली',
    icon: '🇳🇵',
    title: 'भाषा',
  },
  'nl-BE': {
    lang: 'nl-BE',
    label: 'Vlaams',
    icon: '🇧🇪',
    title: 'Taal',
  },
  'nl-NL': {
    lang: 'nl-NL',
    label: 'Vlaams',
    icon: '🇳🇱',
    title: 'Taal',
  },
  'pt-BR': {
    lang: 'pt-BR',
    label: 'Português',
    icon: '🇧🇷',
    title: 'Idiomas',
  },
  'pt-PT': {
    lang: 'pt-PT',
    label: 'Português',
    icon: '🇵🇹',
    title: 'Idiomas',
  },
  'ro-RO': {
    lang: 'ro-RO',
    label: 'Română',
    icon: '🇷🇴',
    title: 'Limba',
  },
  'ru-RU': {
    lang: 'ru-RU',
    label: 'русский',
    icon: '🇷🇺',
    title: 'язык',
  },
  'sk-SK': {
    lang: 'sk-SK',
    label: 'Slovenčina',
    icon: '🇸🇰',
    title: 'Jazyk',
  },
  'sr-RS': {
    lang: 'sr-RS',
    label: 'српски језик',
    icon: '🇸🇷',
    title: 'Језик',
  },
  'sl-SI': {
    lang: 'sl-SI',
    label: 'Slovenščina',
    icon: '🇸🇱',
    title: 'Jezik',
  },
  'sv-SE': {
    lang: 'sv-SE',
    label: 'Svenska',
    icon: '🇸🇪',
    title: 'Språk',
  },
  'ta-IN': {
    lang: 'ta-IN',
    label: 'தமிழ்',
    icon: '🇮🇳',
    title: 'மொழி',
  },
  'th-TH': {
    lang: 'th-TH',
    label: 'ไทย',
    icon: '🇹🇭',
    title: 'ภาษา',
  },
  'tr-TR': {
    lang: 'tr-TR',
    label: 'Türkçe',
    icon: '🇹🇷',
    title: 'Dil',
  },
  'uk-UA': {
    lang: 'uk-UA',
    label: 'Українська',
    icon: '🇺🇰',
    title: 'Мова',
  },
  'vi-VN': {
    lang: 'vi-VN',
    label: 'Tiếng Việt',
    icon: '🇻🇳',
    title: 'Ngôn ngữ',
  },
  'zh-CN': {
    lang: 'zh-CN',
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言',
  },
  'zh-TW': {
    lang: 'zh-TW',
    label: '繁體中文',
    icon: '🇭🇰',
    title: '語言',
  },
};

const localesData = ['vi-VN', 'en-US'];

const statusAutoUploadEnum = {
  INIT: { text: 'Khởi tạo', key: 'INIT', id: 'pages.status.INIT', color: 'cyan' },
  SUCCESS: { text: 'Thành công', key: 'SUCCESS', id: 'pages.status.SUCCESS', color: 'green' },
  FAIL: { text: 'Thất bại', key: 'FAIL', id: 'pages.status.FAIL', color: 'red' },
  PROCESSING: {
    text: 'Đang tiến hành',
    key: 'PROCESSING',
    id: 'pages.status.PROCESSING',
    color: 'gold',
  },
};

const statusEnum = {
  INIT: { text: 'Khởi tạo', key: 'INIT', id: 'pages.status.INIT' },
  ACTIVE: { text: 'Hoạt động', key: 'ACTIVE', id: 'pages.status.ACTIVE' },
  INACTIVE: { text: 'Không hoạt động', key: 'INACTIVE', id: 'pages.status.INACTIVE' },
};

const TYPE_MENU = [
  { text: 'Portal', key: 'PORTAL', id: 'pages.type.portal' },
  { text: 'Public', key: 'PUBLIC', id: 'pages.type.public' },
];

const TYPE_VIDEO = [
  { text: 'Loại 1 là up từng phần', key: 'TYPE_1', id: 'pages.video.type_1' },
  { text: 'Loại 2 là up một lần', key: 'TYPE_2', id: 'pages.video.type_2' },
];

const typeMenuEnum = {
  PORTAL: { text: 'Portal', id: 'pages.type.portal', color: 'green' },
  PUBLIC: { text: 'Public', id: 'pages.type.public', color: 'cyan' },
};

const typeUploadEnum = {
  PICTURE: { text: 'Ảnh', id: 'pages.picture' },
  VIDEO: { text: 'Video', id: 'pages.video' },
};

const genderEnum = {
  MALE: { text: 'Nam', id: 'pages.gender.male' },
  FEMALE: { text: 'Nữ', id: 'pages.gender.female' },
  OTHER: { text: 'Khác', id: 'pages.gender.other' },
};

const GENDER = [
  { text: 'Nam', key: 'MALE', id: 'pages.gender.male' },
  { text: 'Nữ', key: 'FEMALE', id: 'pages.gender.female' },
  { text: 'Khác', key: 'OTHER', id: 'pages.gender.other' },
];

const TYPE_FORM: {
  CREATE: 'CREATE';
  UPDATE: 'UPDATE';
  COPY: 'COPY';
  DELETE: 'DELETE';
  CREATE_MANY: 'CREATE_MANY';
  UPDATE_STATUS: 'UPDATE_STATUS';
  UPDATE_PASSWORD: 'UPDATE_PASSWORD';
  APPROVE: 'APPROVE';
} = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  COPY: 'COPY',
  DELETE: 'DELETE',
  CREATE_MANY: 'CREATE_MANY',
  UPDATE_STATUS: 'UPDATE_STATUS',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  APPROVE: 'APPROVE',
};

const ActionType = {
  READ: { text: 'Read', value: 'READ' },
  IMPORT: { text: 'Import', value: 'IMPORT' },
  UPDATE: { text: 'Update', value: 'UPDATE' },
  CREATE: { text: 'Create', value: 'CREATE' },
  DELETE: { text: 'Delete', value: 'DELETE' },
  EXPORT: { text: 'Export', value: 'EXPORT' },
  BROWSE: { text: 'Browse', value: 'BROWSE' },
  UPDATE_STATUS: { text: 'Update status', value: 'UPDATE_STATUS' },
  SYNC: { text: 'Sync', value: 'SYNC' },
  COPY: { text: 'Copy', value: 'COPY' },
};

const SIZE_AVATAR = {
  width: 50,
  height: 50,
};

const PHONE_PROVIDER = {
  viettel: ['086', '096', '097', '098', '032', '033', '034', '035', '036', '037', '038', '039'],
  vinaphone: ['088', '091', '094', '083', '084', '085', '081', '082'],
  mobiphone: ['089', '090', '093', '070', '079', '077', '076', '078'],
  vinamobile: ['092', '056', '058'],
  gmobile: ['099', '059'],
  allProvider: [
    '086',
    '096',
    '097',
    '098',
    '032',
    '033',
    '034',
    '035',
    '036',
    '037',
    '038',
    '039',
    '088',
    '091',
    '094',
    '083',
    '084',
    '085',
    '081',
    '082',
    '089',
    '090',
    '093',
    '070',
    '079',
    '077',
    '076',
    '078',
    '092',
    '056',
    '058',
    '099',
    '059',
  ],
};

export {
  ActionType,
  GENDER,
  PHONE_PROVIDER,
  SIZE_AVATAR,
  TYPE_FORM,
  TYPE_MENU,
  TYPE_VIDEO,
  defaultLangUConfigMap,
  genderEnum,
  localesData,
  statusAutoUploadEnum,
  statusEnum,
  typeMenuEnum,
  typeUploadEnum,
};

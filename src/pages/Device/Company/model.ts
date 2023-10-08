import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { CompanyItem } from './data';

export interface CompanyModalState {
  CompanyList?: {
    reload?: () => void;
  };
  CompanyForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: CompanyItem;
  };
}

export interface CompanyModelType {
  namespace: string;
  state: CompanyModalState;
  reducers: {
    updateCompanyForm: Reducer<CompanyModalState>;
    updateCompanyList: Reducer<CompanyModalState>;
  };
}

const CompanyModel: CompanyModelType = {
  namespace: 'company',
  state: {
    CompanyList: {
      reload: undefined,
    },
    CompanyForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateCompanyForm(state, action) {
      const CompanyForm = state?.CompanyForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CompanyForm[k] = fields[k];
      });
      return { ...state, CompanyForm };
    },
    updateCompanyList(state, action) {
      const CompanyList = state?.CompanyList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CompanyList[k] = fields[k];
      });
      return { ...state, CompanyList };
    },
  },
};

export default CompanyModel;

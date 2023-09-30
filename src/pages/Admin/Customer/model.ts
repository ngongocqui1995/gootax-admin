import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { CustomerItem } from './data';

export interface CustomerModalState {
  CustomerList?: {
    reload?: () => void;
  };
  CustomerForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: CustomerItem;
  };
}

export interface CustomerModelType {
  namespace: string;
  state: CustomerModalState;
  reducers: {
    updateCustomerForm: Reducer<CustomerModalState>;
    updateCustomerList: Reducer<CustomerModalState>;
  };
}

const CustomerModel: CustomerModelType = {
  namespace: 'customer',
  state: {
    CustomerList: {
      reload: undefined,
    },
    CustomerForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateCustomerForm(state, action) {
      const CustomerForm = state?.CustomerForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CustomerForm[k] = fields[k];
      });
      return { ...state, CustomerForm };
    },
    updateCustomerList(state, action) {
      const CustomerList = state?.CustomerList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CustomerList[k] = fields[k];
      });
      return { ...state, CustomerList };
    },
  },
};

export default CustomerModel;

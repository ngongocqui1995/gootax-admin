import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { TypeCarItem } from './data';

export interface TypeCarModalState {
  TypeCarList?: {
    reload?: () => void;
  };
  TypeCarForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: TypeCarItem;
  };
}

export interface TypeCarModelType {
  namespace: string;
  state: TypeCarModalState;
  reducers: {
    updateTypeCarForm: Reducer<TypeCarModalState>;
    updateTypeCarList: Reducer<TypeCarModalState>;
  };
}

const TypeCarModel: TypeCarModelType = {
  namespace: 'type_car',
  state: {
    TypeCarList: {
      reload: undefined,
    },
    TypeCarForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateTypeCarForm(state, action) {
      const TypeCarForm = state?.TypeCarForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        TypeCarForm[k] = fields[k];
      });
      return { ...state, TypeCarForm };
    },
    updateTypeCarList(state, action) {
      const TypeCarList = state?.TypeCarList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        TypeCarList[k] = fields[k];
      });
      return { ...state, TypeCarList };
    },
  },
};

export default TypeCarModel;

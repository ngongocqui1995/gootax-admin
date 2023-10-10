import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { CarItem } from './data';

export interface CarModalState {
  CarList?: {
    reload?: () => void;
  };
  CarForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: CarItem;
  };
}

export interface CarModelType {
  namespace: string;
  state: CarModalState;
  reducers: {
    updateCarForm: Reducer<CarModalState>;
    updateCarList: Reducer<CarModalState>;
  };
}

const CarModel: CarModelType = {
  namespace: 'car',
  state: {
    CarList: {
      reload: undefined,
    },
    CarForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateCarForm(state, action) {
      const CarForm = state?.CarForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CarForm[k] = fields[k];
      });
      return { ...state, CarForm };
    },
    updateCarList(state, action) {
      const CarList = state?.CarList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CarList[k] = fields[k];
      });
      return { ...state, CarList };
    },
  },
};

export default CarModel;

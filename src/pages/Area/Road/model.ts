import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { RoadItem } from './data';

export interface RoadModalState {
  RoadList?: {
    reload?: () => void;
  };
  RoadForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: RoadItem;
  };
}

export interface RoadModelType {
  namespace: string;
  state: RoadModalState;
  reducers: {
    updateRoadForm: Reducer<RoadModalState>;
    updateRoadList: Reducer<RoadModalState>;
  };
}

const RoadModel: RoadModelType = {
  namespace: 'road',
  state: {
    RoadList: {
      reload: undefined,
    },
    RoadForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateRoadForm(state, action) {
      const RoadForm = state?.RoadForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        RoadForm[k] = fields[k];
      });
      return { ...state, RoadForm };
    },
    updateRoadList(state, action) {
      const RoadList = state?.RoadList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        RoadList[k] = fields[k];
      });
      return { ...state, RoadList };
    },
  },
};

export default RoadModel;

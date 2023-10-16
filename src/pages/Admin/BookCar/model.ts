import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { BookCarItem } from './data';

export interface BookCarModalState {
  BookCarList?: {
    reload?: () => void;
  };
  BookCarForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: BookCarItem;
  };
}

export interface BookCarModelType {
  namespace: string;
  state: BookCarModalState;
  reducers: {
    updateBookCarForm: Reducer<BookCarModalState>;
    updateBookCarList: Reducer<BookCarModalState>;
  };
}

const BookCarModel: BookCarModelType = {
  namespace: 'book_car',
  state: {
    BookCarList: {
      reload: undefined,
    },
    BookCarForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateBookCarForm(state, action) {
      const BookCarForm = state?.BookCarForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        BookCarForm[k] = fields[k];
      });
      return { ...state, BookCarForm };
    },
    updateBookCarList(state, action) {
      const BookCarList = state?.BookCarList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        BookCarList[k] = fields[k];
      });
      return { ...state, BookCarList };
    },
  },
};

export default BookCarModel;

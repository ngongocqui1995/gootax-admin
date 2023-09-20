import { I_TYPE_FORM } from '@/utils/interface';

declare namespace UserLogin {
  type LoginParams = {
    username: string;
    password: string;
    autoLogin?: boolean;
    type?: I_TYPE_FORM;
  };

  type RegisterParams = {
    email: string;
    name: string;
    phone: string;
    password: string;
  };

  type AuthParams = {
    email: string;
    password: string;
    device?: string;
  };
}

export interface MenuItem {
  url: string;
  type: string;
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
}

export interface CreateMenu {
  url: string;
  type: string;
}

export interface UpdateMenu {
  url: string;
  type: string;
}

export interface QueryMenus {
  data: MenuItem[];
  total: number;
  success: boolean;
}

export interface ChangeStatusMenu {
  status: string;
  message: string;
}

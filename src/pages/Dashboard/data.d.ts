interface DataStatistic {
  key: string;
  title: string;
  total: number;
  icon: React.ReactNode;
  background: string;
}

export interface StateStatistic {
  data: DataStatistic[];
  loading: boolean;
}

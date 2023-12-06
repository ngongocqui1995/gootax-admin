import { LineChartOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
import { useAsyncEffect, useSetState } from 'ahooks';
import { Card, Empty } from 'antd';
import dayjs from 'dayjs';
import { queryOrder } from '../../service';

interface StatisticSummaryProps {
  params: () => any;
  loading: boolean;
}

const StatisticSummary: React.FC<StatisticSummaryProps> = (props) => {
  const [state, setState] = useSetState<{ data: any[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  useAsyncEffect(async () => {
    setState({ loading: true });
    const res = await queryOrder(props.params());

    setState({
      data: res.data?.map((item: any) => ({ ...item, sum: +item.sum })) || [],
      loading: false,
    });
  }, [props.loading]);

  return (
    <Card
      loading={state.loading}
      title={
        <div className="flex gap-2">
          <LineChartOutlined className="text-[20px]" />
          {`Thống kê đơn hàng và doanh số`}
        </div>
      }
      className="mt-2"
    >
      {state.data?.length === 0 && (
        <Empty className="h-[334px]" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {state.data?.length !== 0 && (
        <Line
          data={state.data}
          xField="createdAt"
          yField="sum"
          seriesField="title"
          animation={{
            appear: {
              animation: 'path-in',
              duration: 5000,
            },
          }}
          xAxis={{
            label: {
              formatter: (v: string) => dayjs(v).format('DD/MM/YYYY'),
            },
          }}
          yAxis={{
            label: {
              formatter: (v: string) => (+v).toLocaleString(undefined),
            },
          }}
        />
      )}
    </Card>
  );
};

export default StatisticSummary;

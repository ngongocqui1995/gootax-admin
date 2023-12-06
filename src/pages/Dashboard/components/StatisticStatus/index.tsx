import { PieChartOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';
import { useAsyncEffect, useSetState } from 'ahooks';
import { Card, Empty } from 'antd';
import { queryOrderStatus } from '../../service';

interface StatisticStatusProps {
  params: () => any;
  loading: boolean;
}

const StatisticStatus: React.FC<StatisticStatusProps> = (props) => {
  const [state, setState] = useSetState<{ data: any[]; loading: boolean }>({
    data: [],
    loading: false,
  });

  useAsyncEffect(async () => {
    setState({ loading: true });
    const res = await queryOrderStatus(props.params());

    setState({
      data: res.data || [],
      loading: false,
    });
  }, [props.loading]);

  return (
    <Card
      loading={state.loading}
      title={
        <div className="flex gap-2">
          <PieChartOutlined className="text-[20px]" />
          {`Thống kê trạng thái đơn hàng`}
        </div>
      }
      className="mt-2"
    >
      {state.data?.length === 0 && (
        <Empty className="h-[334px]" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {state.data?.length !== 0 && (
        <Pie
          data={state.data}
          angleField="value"
          colorField="type"
          radius={0.9}
          color={['green', 'red']}
          label={{
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
              fontSize: 14,
              textAlign: 'center',
              fill: 'white',
            },
          }}
          interactions={[
            {
              type: 'element-active',
            },
          ]}
        />
      )}
    </Card>
  );
};

export default StatisticStatus;

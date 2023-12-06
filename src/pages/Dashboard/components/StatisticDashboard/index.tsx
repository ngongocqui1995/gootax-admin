import { CarOutlined, DollarOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useAsyncEffect, useSetState } from 'ahooks';
import { Card, Col, Row, Spin } from 'antd';
import { StateStatistic } from '../../data';
import { queryStatistic } from '../../service';

interface StatisticDashboardProps {
  params: () => any;
  loading: boolean;
}

const StatisticDashboard: React.FC<StatisticDashboardProps> = (props) => {
  const [state, setState] = useSetState<StateStatistic>({
    data: [
      {
        title: 'Đơn đặt',
        key: 'total_order',
        total: 0,
        icon: <CarOutlined className="text-[50px]" />,
        background: 'linear-gradient(300deg, rgb(96, 113, 228), rgb(128, 96, 228))',
      },
      {
        title: 'Doanh số',
        key: 'total_amount',
        total: 0,
        icon: <DollarOutlined className="text-[50px]" />,
        background: 'linear-gradient(300deg, rgb(9, 106, 174), rgb(53, 180, 226))',
      },
      {
        title: 'Khách hàng',
        key: 'total_customer',
        total: 0,
        icon: <UserOutlined className="text-[50px]" />,
        background: 'linear-gradient(300deg, rgb(21, 87, 153), rgb(21, 153, 87))',
      },
      {
        title: 'Tài xế',
        key: 'total_driver',
        total: 0,
        icon: <UsergroupAddOutlined className="text-[50px]" />,
        background: 'linear-gradient(300deg, rgb(78, 50, 139), rgb(176, 61, 162))',
      },
    ],
    loading: false,
  });

  useAsyncEffect(async () => {
    setState({ loading: true });
    const res = await queryStatistic(props.params());

    setState({
      data: state.data.map((item) => ({ ...item, total: res.data?.[item.key] || 0 })),
      loading: false,
    });
  }, [props.loading]);

  return (
    <Spin spinning={state.loading}>
      <Row gutter={[8, 8]}>
        {state.data.map((item, index) => (
          <Col key={index} xs={12} sm={12} md={6} lg={6}>
            <Card style={{ background: item.background, color: 'white' }}>
              <div className="flex gap-4 flex-col">
                <div>{item.title}</div>
                <div className="flex justify-between items-center">
                  <CarOutlined className="text-[50px]" />
                  <div>{item.total.toLocaleString(undefined)}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Spin>
  );
};

export default StatisticDashboard;

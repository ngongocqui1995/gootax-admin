import { ProFormDateRangePicker } from '@ant-design/pro-components';
import { useSetState } from 'ahooks';
import { Card, Col, Row } from 'antd';
import dayjs from 'dayjs';
import StatisticDashboard from './components/StatisticDashboard';
import StatisticStatus from './components/StatisticStatus';
import StatisticSummary from './components/StatisticSummary';

const Dashboard = () => {
  const [state, setState] = useSetState({
    from_date: dayjs().startOf('month'),
    to_date: dayjs().endOf('month'),
    loading: false,
  });

  return (
    <Card
      title="Dashboard"
      bordered={false}
      style={{ background: 'transparent' }}
      extra={
        <ProFormDateRangePicker
          allowClear={false}
          name="date"
          noStyle
          fieldProps={{
            value: [state.from_date, state.to_date],
            onChange: (values) => {
              if (values?.[0] && values?.[1]) {
                setState({ from_date: values[0], to_date: values[1] });
              }
            },
            onOpenChange: () => {
              setState({ loading: !state.loading });
            },
          }}
        />
      }
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <StatisticDashboard
            loading={state.loading}
            params={() => ({ from_date: state.from_date, to_date: state.to_date })}
          />
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <StatisticSummary
                loading={state.loading}
                params={() => ({ from_date: state.from_date, to_date: state.to_date })}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <StatisticStatus
                loading={state.loading}
                params={() => ({ from_date: state.from_date, to_date: state.to_date })}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Dashboard;

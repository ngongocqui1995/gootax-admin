import { history } from '@umijs/max';
import { Button, Result } from 'antd';

function backToHome() {
  history.push('/');
}

const SuperUnAccessiblePage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi,đường dẫn không tồn tại!"
      extra={
        <Button type="primary" onClick={backToHome}>
          Về trang chủ
        </Button>
      }
    />
  );
};

const SuperNoFoundPage = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không có quyền truy cập trang này!"
      extra={
        <Button type="primary" onClick={backToHome}>
          Về trang chủ
        </Button>
      }
    />
  );
};

export { SuperNoFoundPage, SuperUnAccessiblePage };

import { Button, Result } from 'antd';
import React from 'react';

class SuperErrorBoundary extends React.Component<
  Record<string, any>,
  { hasError: boolean; errorInfo: string }
> {
  state = { hasError: false, errorInfo: '' };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  render() {
    if (this.state.hasError)
      return (
        <Result
          icon={
            <img
              width={256}
              src="https://gw.alipayobjects.com/zos/antfincdn/zIgkN%26mpMZ/shibaizhuangtaizuo.png"
            />
          }
          style={{
            height: '100%',
            background: '#fff',
          }}
          title="Hệ thống đang cập nhật..."
          extra={
            <>
              <div
                style={{
                  maxWidth: 620,
                  textAlign: 'start',
                  backgroundColor: 'rgba(255,229,100,0.3)',
                  borderInlineStartColor: '#ffe564',
                  borderInlineStartWidth: '9px',
                  borderInlineStartStyle: 'solid',
                  padding: '20px 45px 20px 26px',
                  margin: 'auto',
                  marginBlockEnd: '30px',
                  marginBlockStart: '20px',
                }}
              >
                <p>Trang web đã cập nhật dữ liệu mới</p>
                <p>
                  Vui lòng <strong>khởi động</strong> lại trang!
                </p>
                <p>Nếu vẫn còn xuất hiện thông báo này, báo cáo đội ngũ kĩ thuật!</p>
              </div>

              <Button
                danger
                type="primary"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Khởi động lại trang
              </Button>
            </>
          }
        />
      );
    return this.props.children;
  }
}

export default SuperErrorBoundary;

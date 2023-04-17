import { Form, Input, Button } from 'antd';
import { useCallback, useState } from 'react';
import Styles from './index.module.less';
import { login } from '@/api/user';

function Login() {
  interface FormData {
    username: string,
    password: string
  }
  const [form] = Form.useForm();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const onFinish = (value: FormData) => {
    // console.log(value);
    login({
      username: value.username,
      password: value.password
    });
  };
  return (
    <div className={Styles.login}>
      <div className={Styles.login_content}>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item name="username" required>
            <Input placeholder="用户名" />

          </Form.Item>
          <Form.Item name="password" required>
            <Input placeholder="密码" />
          </Form.Item>
          <div className={Styles.login_footer}>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
            <Button onClick={() => { form.resetFields(); }} type="primary">
              重制
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}

export default Login;

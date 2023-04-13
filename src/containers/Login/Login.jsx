import React, { useEffect } from "react";
import { Form, Input, Button, Layout, Divider, notification, Card } from "antd";
import {
  UserOutlined,
  LockOutlined,
  KeyOutlined,
  CopyrightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import "./Login.scss";
import Logo from "../../assets/Images/logo_8.jpg";

import { AuthAPI } from "../../util/ApiGateway/Api";
import { useState } from "react";
import CommonFooter from "../../util/Footer/Footer";
import axios from "axios";

const { Header, Content, Footer } = Layout;

const Login = () => {
  let history = useHistory();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const notificationFun = (message, description, type) => {
    notification[type]({
      message: message,
      description: description,
      duration: type === "error" ? 6 : 2,
      style: {
        backgroundColor: type === "error" ? "#ffccc7" : "#f6ffed",
      },
    });
  };

  useEffect(() => {
    document.title = "MedSavvy";
    window.scrollTo(0, 0);
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8001/api/v1/auth/signin",
        values
      );

      console.log("LOGIN INFORMATION ", data.data);
      localStorage.setItem("user_id", data.data.user_id);
      localStorage.setItem("accessToken", data.data.token);
      localStorage.setItem("userRole", data.data.role_name);
      localStorage.setItem("username", data.data.username);
      localStorage.setItem("role_id", data.data.role_id);
      localStorage.setItem("roleAccess", data.data.permission_list);

      setLoading(false);

      notificationFun(
        "Successfully Logged In",
        "Welcome to Prism CRM",
        "success"
      );
      history.push("/manager");
    } catch (error) {
      if (error?.response?.data?.message) {
        form.setFieldsValue({
          userID: values.userID,
          password: "",
        });
        setLoading(false);
        if (
          error?.response?.data?.message === "System is under maintenance!!"
        ) {
          notificationFun(
            error?.response?.data?.message,
            "System is under maintenance!!",
            "error"
          );
          localStorage.clear();
          history.push("/under-maintenance");
        } else {
          notificationFun(
            error?.response?.data?.message,
            "Please enter correct User ID & Password",
            "error"
          );
        }
      } else {
        notificationFun(
          "Something went wrong",
          "Please check your connection",
          "error"
        );
        form.setFieldsValue({
          userID: values.userID,
          password: "",
        });
        setLoading(false);
      }
    }
  };

  return (
    <Layout className="login-layout" style={{ height: "100vh" }}>
      <div className="head-divider">
        <Divider />
      </div>
      <Content>
        <Card
          title="Welcome"
          className="login-form"
          cover={<img src={Logo} height="120px" width="60px" alt="logo" />}
        >
          <Form form={form} name="normal_login" onFinish={onFinish}>
            <Form.Item
              name="user_name"
              rules={[
                {
                  required: true,
                  message: "Please input your User Name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                visibilityToggle={true}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                disabled={loading}
                htmlType="submit"
                className="login-form-button"
              >
                {loading && <LoadingOutlined />} Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
      <CommonFooter />
    </Layout>
  );
};

export default Login;

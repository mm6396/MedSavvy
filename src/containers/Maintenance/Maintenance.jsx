import React from "react";
import { Layout, Divider, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

import Logo from "../../assets/Images/ecrmLogoTemp.png";
// import white from '../../assets/Images/Unload.png';

import Tree from "../../assets/Images/under-maintenance.svg";
import "../Login/Login.scss";

import CommonFooter from "../../util/Footer/Footer";
const { Header, Content } = Layout;

const Maintenance = () => {
  return (
    <Layout className="login-layout">
      <Header className="login-header">
        <Link to="/manager" className="logo-link">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <img className="app_logo" src={Logo} height="50px" alt="logo" />
            {/* <p
              style={{
                fontWeight: "bold",
                color: "#004f9f",
                fontSize: "20px",
                margin: "0",
              }}
            >
              Prism CRM
            </p> */}
          </div>
        </Link>
      </Header>
      <div className="head-divider">
        <Divider />
      </div>
      <Content>
        <div>
          <Row justify="center" style={{ marginTop: "2rem" }}>
            <Col>
              <img className='img_maintenance' src={Tree} alt="login-tree" />
            </Col>
          </Row>
        </div>
        <div>
          <Row justify="center" style={{ marginTop: "2rem" }}>
            <Col>
              <h1>System is undergoing maintenance</h1>
            </Col>
          </Row>
        </div>
        <div>
          <Row justify="center" style={{ marginTop: "2rem" }}>
            <Col>
              <Link to="/manager">
                <Button type="primary">Go To Home</Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Content>
      <CommonFooter />
    </Layout>
  );
};

export default Maintenance;

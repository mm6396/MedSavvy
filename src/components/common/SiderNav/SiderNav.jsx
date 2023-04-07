import React from "react";
import { Layout, Menu, Affix } from "antd";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./SiderNav.scss";
import {
  FaUserTag,
  FaUserFriends,
  FaUserCog,
  FaLocationArrow,
  FaPeopleArrows,
  FaUsers,
  FaPhoneSquare,
} from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import {
  RiHomeHeartFill,
  RiFileUserFill,
  RiBarChartBoxFill,
} from "react-icons/ri";
import { AiFillNotification } from "react-icons/ai";

const { Sider } = Layout;

const SiderNav = () => {
  let location = useLocation();
  const [path, setPath] = useState("");
  const [phone, setPhone] = useState(localStorage.getItem("device"));

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const appStyle = {
    display: "none",
  };

  return (
    <Affix
      className="sidernav-affix"
      style={phone === "mobile" ? appStyle : null}
      offsetTop={90}
    >
      <div>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          className="site-layout-background sider-res-pos-div"
        >
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[path.split("/")[2]]}
            style={{
              height: "100%",
              borderRight: 0,
              minHeight: "100vh",
              paddingTop: "20px",
            }}
          >
            {localStorage.getItem("roleAccess")?.split(",").includes("13") && (
              <Menu.Item
                style={{
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
                key="dashboard"
                icon={
                  <RiHomeHeartFill
                    style={{ fontSize: "17px", marginRight: "7px" }}
                  />
                }
              >
                {" "}
                Dashboard <Link to="/manager/dashboard" />
              </Menu.Item>
            )}
            {localStorage.getItem("roleAccess")?.split(",").includes("1") && (
              <Menu.Item
                style={{
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
                key="user"
                icon={
                  <FaUserFriends
                    style={{ fontSize: "17px", marginRight: "7px" }}
                  />
                }
              >
                {" "}
                User Manager <Link to="/manager/user/list" />
              </Menu.Item>
            )}
            {localStorage.getItem("roleAccess")?.split(",").includes("9") && (
              <Menu.Item
                style={{
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
                key="role"
                icon={
                  <FaUserCog style={{ fontSize: "17px", marginRight: "7px" }} />
                }
              >
                Role Manager <Link to="/manager/role/list" />
              </Menu.Item>
            )}

            {localStorage.getItem("roleAccess")?.split(",").includes("5") && (
              <Menu.Item
                style={{
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
                key="campaign"
                icon={
                  <FaPeopleArrows
                    style={{ fontSize: "17px", marginRight: "7px" }}
                  />
                }
              >
                {" "}
                Campaign <Link to="/manager/campaign/list" />
              </Menu.Item>
            )}

            {localStorage.getItem("roleAccess")?.split(",").includes("14") && (
              <Menu.Item
                style={{
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
                key="survey_manager"
                icon={
                  <FaPeopleArrows
                    style={{ fontSize: "17px", marginRight: "7px" }}
                  />
                }
              >
                {" "}
                Survey Manager <Link to="/manager/survey/view" />
              </Menu.Item>
            )}

            {localStorage.getItem("report")?.split(",").includes("5") && (
              <Menu.Item className="manager-menu" key="report-manager">
                <div className="menu-icon">
                  {" "}
                  <RiFileUserFill />{" "}
                </div>
                Report Manager <Link to="/manager/report-manager" />
              </Menu.Item>
            )}
          </Menu>
        </Sider>
      </div>
    </Affix>
  );
};

export default SiderNav;

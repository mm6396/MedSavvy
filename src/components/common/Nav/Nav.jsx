import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout} from "antd";
import {
  CaretDownOutlined,

} from "@ant-design/icons";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import "./Nav.scss";
import Logo from "../../../assets/Images/logo_8.jpg";

const { Header } = Layout;

const Nav = ({ auth }) => {
  console.log(auth)
  let history = useHistory();
  const [user, setUser] = useState({
    id: null,
    name: " ",
    image: "default.jpg",
    role: "",
  });

  const logout = (params) => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="nav-header"
    >
      <div style={{ minWidth: "92px" }}>
        {" "}
        <Link to="/manager">
          <div className="logo">
            <img src={Logo} height="90px" width="200px" alt="logo" />
            {/* <p className="prism-crm-div">MedSavvy </p> */}
          </div>
        </Link>
      </div>
      {
        auth == 'true' ? null
          :
          <div className="rightside-div">
            <div className="dropdown">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 10px 0 0",
                  minWidth: "150px",
                }}
              >
                <div>
                  <div
                    style={{ height: "18px", color: "#004F9F", fontWeight: "600" }}
                  >
                    {" "}
                    {user.name}
                  </div>
                  <div
                    style={{
                      color: "#8B8B8B",
                      height: "18px",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}
                  >
                    {" "}
                    {localStorage.getItem(
                      "userID"
                    )} {/* (<b>{user.role}</b>) */}{" "}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "#E72582",
                    }}
                  >
                    {" "}
                    {user.role}{" "}
                  </div>
                </div>
                <CaretDownOutlined className="dropdown-button" />
              </div>

              <div className="dropdown-content">
                <Link
                  to={`/manager/profile/view/${user.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  <FaUserAlt className="account-icon" /> Profile{" "}
                </Link>
                <Link
                  onClick={logout}
                  to="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  <RiLogoutBoxFill className="account-icon" /> Log Out{" "}
                </Link>
              </div>
            </div>
          </div>
      }

    </Header>
  );
};

export default Nav;

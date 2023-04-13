import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Layout, Menu, Dropdown, Badge, Empty, Space } from "antd";
import {
  CaretDownOutlined,
  InfoCircleFilled,
  CheckCircleFilled,
} from "@ant-design/icons";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxFill, RiNotification3Fill } from "react-icons/ri";
import "./Nav.scss";
import {
  FieldForceManagerAPI,
  CampaignManagerAPI,
} from "../../../util/ApiGateway/Api";
import notification from "../../../util/Notification/Notification";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";
import Logo from "../../../assets/Images/logo_8.jpg";
// import white from '../../../assets/Images/Unload.png';

import moment from "moment";

// import pic from '../../../assets/Images/pro_pic.jpg';

const { Header } = Layout;

const Nav = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    id: null,
    name: " ",
    image: "default.jpg",
    role: "",
  });
  const [menuarr, setMenuarr] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  // 	(async () => {
  // 		try {

  // 			const { data } = await FieldForceManagerAPI.get(`/FieldForceManager/getUser/${localStorage.getItem('id')}`, {
  // 				headers: {
  // 					Authorization: 'Bearer ' + localStorage.getItem("accessToken")
  // 				}
  // 			});

  // 			console.log(data);
  // 			setUser({ id: data.data.id, name: data.data.user_info.full_name, image: data.data.user_info.user_avater, role: data.role });
  // 		} catch (error) {
  // 			if (error?.response?.data?.message) {

  // 				ErrorHandler(error?.response?.data?.message, history);
  // 			} else {
  // 				notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
  // 			}
  // 		}
  // 	})();
  // }, []);

  const logout = (params) => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    // <Affix offsetTop={0}>
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
            {/* <div style={{ width: '60px', height: '62px', overflow: 'hidden', borderRadius: '10rem', margin: '0 10px 0 0' }} >
							<img src={Logo} style={{ width: '60px', height: '60px' }} alt="user" />
						</div> */}
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
    </Header>
    // </Affix>
  );
};

export default Nav;

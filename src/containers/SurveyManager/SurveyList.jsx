import React, { useState, useEffect, useContext} from "react";
import {  Button, Spin } from "antd";
import ErrorHandler from "../../util/ErrorHandler/ErrorHandler";
import CustomNotification from "../../util/Notification/Notification";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import Questions from "../../components/Surevy/Questions/Questions";
import RemarkComponent from "../../components/Surevy/Remakrs/RemarkComponent";
import axios from "axios";
import moment from "moment";
import { ViewContext } from "../../Contexts/ViewContext";
import AlertMsg from "../../util/Notification/Alert";

const SurevyList = () => {
    const { quesArr, ansArr, setAnsArr, setQuesarr, age, prof, email, setSelectedval, name, setChecked, getCampaignName, setAge, setEmail, setProf, setName } = useContext(ViewContext);
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadBtn, setLoadBtn] = useState(false);
    const [recordObj, setObj] = useState([]);
    const [countPerDay, setCountPerDay] = useState(0);
    const [campaign_name, setCampaignName] = useState(" ");

    let location = useLocation();

    useEffect(() => {
        document.title = "Survey";
        window.scrollTo(0, 0);
        getSurveyList();
        fetchName();
        surveyCount();
    }, []);

    const fetchName = async () => {
        const camp_name = await getCampaignName(location?.state?.campaign_id);
        setCampaignName(camp_name);
    }


    const getSurveyList = async (limit) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:8001/api/v1/campaignRouter/get-survey",
                { campaign_id: location?.state?.campaign_id },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            );
            setObj(data.data);
            setLoading(false);
            setLoadBtn(false);
        } catch (error) {
            setLoading(false);
            if (error?.response?.data?.message) {
                ErrorHandler(error?.response?.data?.message, history);
            } else {
                CustomNotification(
                    "Something went wrong",
                    "Please check your internet connection and try again or communicate with the admin",
                    "error"
                );
            }
        }
    };

      const surveyCount = async () => {
        const user_id = localStorage.getItem("user_id");
        try {
          setLoading(true);
          const { data } = await axios.post("http://localhost:8001/api/v1/campaignRouter/total-survey-by-user", 
          {
            campaign_id : location?.state?.campaign_id, user_id: user_id
          }, 
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          });
          console.log(data);
          setCountPerDay(data?.data[0].count);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          if (error?.response?.data?.message) {
            ErrorHandler(error?.response?.data?.message, history);
          } else {
            CustomNotification("Something went wrong","Please check your internet connection and try again or communicate with the admin","error");
          }
        }
      };

    const OnReturn = () => {
        setAnsArr([]);
        setName('');
        setAge('');
        setEmail('');
        setProf('');
        setQuesarr([]);
        setSelectedval([]);
        setChecked([]);
        setLoading(false);

    };

    const verifyBtn = async () => {
        let newArr = [...quesArr, ...ansArr];
        var resArr = [];
        newArr.filter(function (item) {
            var i = resArr.findIndex(x => x.ques_id == item.ques_id);
            if (i <= -1) {
                resArr.push(item);
            }
            return null;
        });

        const user_id = localStorage.getItem("user_id");

        let values = {
            ansArr: newArr,
            campaign: location?.state?.campaign_id,
            date: moment().format("YYYY-MM-DD"),
            survey_by: user_id,
            customer_name: name,
            customer_age: age,
            profession: prof,
            email: email
        };
        console.log(values);

        try {
            setLoading(true);
            const { data } = await axios.post(
                "http://localhost:8001/api/v1/campaignRouter/save-survey",
                values,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            );
            setLoading(false);
            OnReturn();
            surveyCount();
            CustomNotification("Saved Succesfully", "Continue Next Survey", "success");
        } catch (error) {
            if (error?.response?.data?.message) {
                ErrorHandler(error?.response?.data?.message, history);
            } else {
                CustomNotification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
            }
        }
    };

    return (
        <div className="survey" >
            <Spin spinning={loading} >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                    }}
                >
                    <h2 style={{ color: "#00ab55" }}>Total Survey Done</h2>
                    <div
                        style={{
                            border: "1px solid #004d80",
                            width: "260px",
                            textAlign: "center",
                        }}
                    >
                        <h2
                            style={{
                                padding: "10px",
                                fontWeight: "600",
                                color: "#004d80",
                                fontSize: "25px",
                            }}
                        >
                            {countPerDay}
                        </h2>
                    </div>
                </div>
                <div>
                    <h1
                        style={{
                            textAlign: "center",
                            color: "#00ab55",
                            fontSize: "22px",
                            fontWeight: "bold",
                            textDecorationLine: "underline",
                        }}
                    >
                        Survey For : {campaign_name}
                    </h1>
                    <div className="">
                        <div>
                            <Spin spinning={loading}>

                                <div>
                                    <RemarkComponent />
                                    <br />
                                    <br />
                                    <Questions arr={recordObj} />
                                    <br />
                                    <br />
                                    <div style={{ textAlign: "center" }}>
                                        <Button
                                            shape="round"
                                            onClick={() => verifyBtn()}
                                            style={{
                                                backgroundColor: "#00ab55",
                                                fontWeight: "bold",
                                                color: "white",
                                                borderRadius: ".4rem",
                                            }}
                                        >
                                            Save {loading ? <LoadingOutlined /> : ''}
                                        </Button>
                                    </div>
                                </div>

                            </Spin>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default SurevyList;

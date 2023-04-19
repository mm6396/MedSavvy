import React, { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import ErrorHandler from "../util/ErrorHandler/ErrorHandler";
import CustomNotification from "../util/Notification/Notification";
import axios from "axios";

export const ViewContext = createContext();

export const ViewContextProvider = (props) => {
  const [quesArr, setQuesarr] = useState([]);
  const [selectedVal, setSelectedval] = useState([]);
  const [checked, setChecked] = useState([]);
  const [ansArr, setAnsArr] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [prof, setProf] = useState('');
  const [email, setEmail] = useState("");
  let history = useHistory();

  const getCampaignName = async (campaign_id) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8001/api/v1/campaignRouter/get-name", { campaign_id: campaign_id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      return data.data[0].camp_name;
    } catch (error) {
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
  }

  return (
    <ViewContext.Provider
      value={{
        ansArr,
        setAnsArr,
        quesArr,
        setQuesarr,
        selectedVal,
        setSelectedval,
        checked,
        setChecked,
        name,
        setName,
        age,
        setAge,
        prof,
        setProf,
        email,
        setEmail,
        getCampaignName
      }}
    >
      {props.children}
    </ViewContext.Provider>
  );
};

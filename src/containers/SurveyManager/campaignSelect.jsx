import React, { useState, useEffect, } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Spin, Select, Result,Skeleton } from "antd";
import ErrorHandler from "../../util/ErrorHandler/ErrorHandler";
import CustomNotification from "../../util/Notification/Notification";
import axios from "axios";
import './surstyle.scss';

const { Option } = Select;

const CampaignSelection = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [campaign_id, setCampaignID] = useState();

    let history = useHistory();

    useEffect(() => {
        document.title = "AuditAI: Select Campaign";
        window.scrollTo(0, 0);
        fetchCampaign();
    }, []);

    const fetchCampaign = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post("http://localhost:8001/api/v1/campaignRouter/assigned-campaings",
                { user_id: localStorage.getItem('user_id') },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            );

            console.log(data);
            setCampaigns(data.data)
            setLoading(false);
          
        } catch (error) {
            setLoading(false);
            if (error?.response?.data?.message) {
                ErrorHandler(error?.response?.data?.message, history);
            }
            else {
                CustomNotification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
            }
        }
    };

    const onCampaignChange = (val) => {
        if (val) {
            setCampaignID(val);
            history.push({
                pathname: "/manager/survey/list"
                ,
                state : {
                    campaign_id: val,
                    user_id: localStorage.getItem('user_id')
                }
            })
        }
    }

    return (
        <div style={{margin: '60px'}}>
            {
                loading? 
                <Skeleton active />
                :
                <div>
            {
                campaigns?.length > 0 ?
                    <div className="camp_sel" style={{marginTop: '300px'}}>
                        <Row justify='center'>
                            <Col xs={24} md={8}>
                                <h4 style={{ color: "#004F9F", fontWeight: "bold" }}>
                                    Select Campaign
                                </h4>
                                <Select
                                    placeholder="Campaign Selection"
                                    style={{ width: "100%" }}
                                    allowClear
                                    showSearch
                                    showArrow
                                    optionFilterProp="children"
                                    onChange={onCampaignChange}
                                >
                                    {campaigns?.map((v, i) => (
                                        <Option value={v.camp_id} key={i}>
                                            {" "}
                                            {v.camp_name}{" "}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        {/* <Row justify='center'>
                            <Button onClick={onSubmit} type='primary' shape="round">Submit</Button>
                        </Row> */}

                    </div> :
                    <Result
                        title="You are not assigned to any active campaign"
                        subTitle = "Please contact with the admin"
                    />
            }

        </div>
            }
        </div>
    )
}

export default CampaignSelection
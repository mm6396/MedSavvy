import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Spin } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { FieldForceManagerAPI } from '../../../util/ApiGateway/Api';
import './DashboardManagerHome.scss';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler';
import notificationFun from '../../../util/Notification/Notification';

const { Meta } = Card;

const DashboardManagerHome = () => {

    // dashboard array example

    // const example = [
    //     {
    //         assigned_by: 41,
    //         assigned_role: 9,
    //         assigned_to: 41,
    //         createdAt: "2020-10-28T15:52:36.169Z",
    //         created_by: 41,
    //         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, aspernatur porro quam molestias corporis, iure ratione pariatur saepe qui inventore quo cupiditate nisi optio vitae debitis provident quas praesentium tempora?",
    //         dpid: [67, 82, 114, 20, 447, 21, 22, 23, 24, 376, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 54, 25, 26, 27, 28, 29, 64, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 50, 51, 52, 53, 56, 57, 58, 59, 60, 61, 62, 63, 65, 66, 68, 69, 70, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113],
    //         id: 41,
    //         link: "https://datastudio.google.com/embed/reporting/6b9f17bc-3407-4d0b-91ec-c51ed22730f0/page/Be16B",
    //         name: "Sales Analysis Dashboard",
    //         roles: [27, 29, 28, 9],
    //         status: true,
    //         stts: true,
    //         updatedAt: "2021-02-14T15:38:53.111Z"
    //     }
    // ]

    // end

    let history = useHistory();
    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        document.title = 'ECRM: Dashboards';
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const { data } = await FieldForceManagerAPI.get('/dashboard/list', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                console.log('/dashboard/list', data);
                setDashboards([...data]);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                } else {
                    notificationFun('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);

    return (
        <Spin spinning={loading} size='large'   >
            <div  className='dashboardhome-div' >
                {/* <h1 style={{ fontWeight: '600', color: '#545454', marginLeft: '40px' }}> Dashboard List </h1> */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'normal' }} >
                    {dashboards.map((v, index) => {
                        return (
                            <Card hoverable className="card-div" key={index}
                                title={<span style={{ display: 'grid', color: 'white', fontWeight: '600' }}> {v.name}  <span style={{ fontSize: '15px', color: 'white', fontWeight: '200' }} > Dashboard Name </span>
                                </span>} >
                                <div style={{ position: 'relative', marginBottom: '10px' }} >
                                    <div style={{ position: 'absolute', backgroundColor: '#c4e1ff ', height: '100%', width: '100%', opacity: '.2' }} />
                                    <iframe src={v.link} style={{ width: '100%' }} />

                                </div>
                                <Meta style={{ fontWeight: '200', fontSize: '18px', marginBottom: '5px' }} description={<div style={{ color: 'white', fontSize: '15px' }} > Description </div>} />
                                <Meta style={{ fontWeight: '600', fontSize: '15px' }} className="description-div"
                                    description={<div style={{ color: 'white' }} >  {v.description} </div>} />
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }} >
                                    <Link to={{ path: v.link, pathname: `/manager/dashboard-manager/dashboard-card/${v.id}`  }} >
                                        <Button  className="view-btn" > View  </Button>
                                    </Link>
                                </div>

                            </Card>
                        )
                    })}

                </div>
            </div>
        </Spin>
    );
};

export default DashboardManagerHome;
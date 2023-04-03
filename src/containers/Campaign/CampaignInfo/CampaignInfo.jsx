import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Spin, Card, Row, Col, Descriptions, Badge, Image, Tag } from 'antd';
import { CampaignManagerAPI } from '../../../util/ApiGateway/Api';
import notification from "../../../util/Notification/Notification";
import UnloadImage from '../../../assets/Images/Unload.png';
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler'

import './CampaignInfo.scss';

const CampaignInfo = () => {

    let { id } = useParams();
    let history = useHistory();
    const [campaign, setCampaign] = useState();
    const [parent, setParent] = useState();
    const [material, setMaterial] = useState();
    const [matTarget, setMatTarget] = useState();
    const [childs, setChilds] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [location, setLocation] = useState({ region: [], area: [], territory: [], distribution: [], point: [] });
    const [location, setLocation] = useState({ region: '', area: '', territory: '', dHouse: '', dPoint: '' });

    useEffect(() => {

        document.title = 'Prism CRM Campaign Info';

        window.scrollTo(0, 0);

    }, []);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await CampaignManagerAPI.get(`/get-campaign/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                // console.log('====================================');
                console.log(data);
                // console.log('====================================');
                let regionArr = [];
                let areaArr = [];
                let territoryArr = [];
                let distributionArr = [];
                let pointArr = [];
                if (data.campaignLocations.length > 0) {
                    data.campaignLocations.forEach(element => {
                        let temObj = { id: element.region_id, name: element.region };
                        if (regionArr.some(obj => obj.id === element.region_id)) {
                            return;
                        } else {
                            regionArr.push(temObj);
                        }
                    });
                }
                if (data.campaignLocations.length > 0) {
                    data.campaignLocations.forEach(element => {
                        let temObj = { id: element.area_id, name: element.area };
                        if (areaArr.some(obj => obj.id === element.area_id)) {
                            return;
                        } else {
                            areaArr.push(temObj);
                        }
                    });
                }
                if (data.campaignLocations.length > 0) {
                    data.campaignLocations.forEach(element => {
                        let temObj = { id: element.territory_id, name: element.territory };
                        if (territoryArr.some(obj => obj.id === element.territory_id)) {
                            return;
                        } else {
                            territoryArr.push(temObj);
                        }
                    });
                }
                if (data.campaignLocations.length > 0) {
                    data.campaignLocations.forEach(element => {
                        let temObj = { id: element.dsid, name: element.distribution_house };
                        if (distributionArr.some(obj => obj.id === element.dsid)) {
                            return;
                        } else {
                            distributionArr.push(temObj);
                        }
                    });
                }
                if (data.campaignLocations.length > 0) {
                    data.campaignLocations.forEach(element => {
                        let temObj = { id: element.dpid, name: element.distribution_point };
                        if (pointArr.some(obj => obj.id === element.dpid)) {
                            return;
                        } else {
                            pointArr.push(temObj);
                        }
                    });
                }

                let tempLocations = location;
                tempLocations.region = regionArr?.map(e => { return e.name }).join(', ')
                tempLocations.territory = territoryArr?.map(e => { return e.name }).join(', ')
                tempLocations.area = areaArr?.map(e => { return e.name }).join(', ')
                tempLocations.dHouse = distributionArr?.map(e => { return e.name }).join(', ')
                tempLocations.dPoint = pointArr?.map(e => { return e.name }).join(', ')

                setLocation(tempLocations);
                setCampaign(data.campaignInfo);
                if (data.campaignInfo.material) {
                    setMaterial(data.campaignInfo.material.map((v, i) => ([`mat_${i + 1}`, v[`mat_${i + 1}`]])));
                    setMatTarget(data.campaignInfo.material.map((v, i) => ([`mat_${i + 1}`, v.target])));
                }
                setParent(data.parentInfo);
                if (data.childInfo)
                    setChilds(data.childInfo);

                setLoading(false);
            } catch (error) {
                console.log(error);
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);

    const onParentCLick = async (id) => {
        try {
            setLoading(true);
            const { data } = await CampaignManagerAPI.get(`/get-campaign/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                }
            });
            // console.log('====================================');
            console.log(data);
            // console.log('====================================');
            let regionArr = [];
            let areaArr = [];
            let territoryArr = [];
            let distributionArr = [];
            let pointArr = [];
            if (data.campaignLocations.length > 0) {
                data.campaignLocations.forEach(element => {
                    let temObj = { id: element.region_id, name: element.region };
                    if (regionArr.some(obj => obj.id === element.region_id)) {
                        return;
                    } else {
                        regionArr.push(temObj);
                    }
                });
            }
            if (data.campaignLocations.length > 0) {
                data.campaignLocations.forEach(element => {
                    let temObj = { id: element.area_id, name: element.area };
                    if (areaArr.some(obj => obj.id === element.area_id)) {
                        return;
                    } else {
                        areaArr.push(temObj);
                    }
                });
            }
            if (data.campaignLocations.length > 0) {
                data.campaignLocations.forEach(element => {
                    let temObj = { id: element.territory_id, name: element.territory };
                    if (territoryArr.some(obj => obj.id === element.territory_id)) {
                        return;
                    } else {
                        territoryArr.push(temObj);
                    }
                });
            }
            if (data.campaignLocations.length > 0) {
                data.campaignLocations.forEach(element => {
                    let temObj = { id: element.dsid, name: element.distribution_house };
                    if (distributionArr.some(obj => obj.id === element.dsid)) {
                        return;
                    } else {
                        distributionArr.push(temObj);
                    }
                });
            }
            if (data.campaignLocations.length > 0) {
                data.campaignLocations.forEach(element => {
                    let temObj = { id: element.dpid, name: element.distribution_point };
                    if (pointArr.some(obj => obj.id === element.dpid)) {
                        return;
                    } else {
                        pointArr.push(temObj);
                    }
                });
            }

            let tempLocations = location;
            tempLocations.region = regionArr?.map(e => { return e.name }).join(', ')
            tempLocations.territory = territoryArr?.map(e => { return e.name }).join(', ')
            tempLocations.area = areaArr?.map(e => { return e.name }).join(', ')
            tempLocations.dHouse = distributionArr?.map(e => { return e.name }).join(', ')
            tempLocations.dPoint = pointArr?.map(e => { return e.name }).join(', ')

            setLocation(tempLocations);
            // setLocation({ region: regionArr, area: areaArr, territory: territoryArr, distribution: distributionArr, point: pointArr });
            setCampaign(data.campaignInfo);
            setParent(data.parentInfo);
            if (data.childInfo)
                setChilds(data.childInfo);

            setLoading(false);
        } catch (error) {
            if (error?.response?.data?.message) {
                ErrorHandler(error?.response?.data?.message, history);
                notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
            } else {
                notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
            }
        }
    }

    return (
        <Spin spinning={loading}>
            <div className="campaign-info">
                <Descriptions title="Campaign Informations">
                    <Descriptions.Item label="Campaign Name">{campaign?.name || 'loading'}</Descriptions.Item>
                    <Descriptions.Item label="Campaign Version">{campaign?.version || 'loading'}</Descriptions.Item>
                    <Descriptions.Item label="Parent Campaign">{parent ? <Link to={`/manager/campaign/info/${parent?.id}`} onClick={(e) => onParentCLick(parent.id)}><a>{parent.name}</a></Link> : 'No Parent'}</Descriptions.Item>
                    <Descriptions.Item label="Start Date">{campaign?.from_date || 'loading'}</Descriptions.Item>
                    <Descriptions.Item label="End Date">{campaign?.to_date || 'loading'}</Descriptions.Item>
                    {/* <Descriptions.Item label="PTR Target">{campaign?.ptr_trgt || 'No Data'}</Descriptions.Item> */}
                    <Descriptions.Item label="Number Validation">{campaign?.number_validation ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Call Checkback Target">{campaign?.checkback_target || 'No Target Set'}</Descriptions.Item>
                    <Descriptions.Item label="Cluster per BR">{campaign?.cluster_count || 'No Data'}</Descriptions.Item>
                    <Descriptions.Item label="Maximum Franchise Target">{campaign?.max_franchise_target || 'No Target Set'}</Descriptions.Item>
                    <Descriptions.Item label="Maximum SOB Target">{campaign?.max_sob_target || 'No Data'}</Descriptions.Item>
                </Descriptions>
                <br />
                <Row className="trgt">
                    <Col xl={{ span: 5, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                        <Card title=" Call Target" style={{ width: '100%' }}>
                            <p><Badge status="default" /><span>Franchise: </span> {campaign?.franchise_call_trgt || 'No Data'}</p>
                            <p><Badge status="default" /><span>SOB: </span> {campaign?.sob_call_trgt || 'No Data'}</p>
                        </Card>
                    </Col>
                    <Col xl={{ span: 5, offset: 1 }} xs={{ span: 24, offset: 0 }}>
                        <Card title="Swapping" style={{ width: '100%' }}>
                            <p><Badge status="default" /><span>Franchise: </span> {campaign?.franchise_swapping_trgt || 'No Data'}</p>
                            <p><Badge status="default" /><span>SOB: </span> {campaign?.sob_swapping_trgt || 'No Data'}</p>
                        </Card>
                    </Col>
                    {material &&
                        <Col xl={{ span: 5, offset: 1 }} xs={{ span: 24, offset: 0 }}>
                            <Card title="Materials" style={{ width: '100%' }}>
                                {material.map((mat, i) => (mat[1] ?
                                    i === 0 ? <p><Tag color="magenta">{`Material-${i + 1}`}:</Tag><span>{mat[1]}</span></p> :
                                        i % 2 === 0 ? <p><Tag color="blue">{`Material-${i + 1}`}:</Tag><span>{mat[1]}</span></p> :
                                            i % 3 === 0 ? <p><Tag color="orange">{`Material-${i + 1}`}:</Tag><span>{mat[1]}</span></p> :
                                                <p><Tag color="green">{`Material-${i + 1}`}:</Tag><span>{mat[1]}</span></p>
                                    : ''))}
                            </Card>
                        </Col>
                    }

                    {matTarget &&
                        <Col xl={{ span: 5, offset: 1 }} xs={{ span: 24, offset: 0 }}>
                            <Card title="Material Target" style={{ width: '100%' }}>
                                {matTarget.map((mat, i) => (mat[1] ?
                                    i === 0 ? <p><Tag color="magenta">{`Material-${i + 1}`}:</Tag><span><Tag>{mat[1]}</Tag></span></p> :
                                        i % 2 === 0 ? <p><Tag color="blue">{`Material-${i + 1}`}:</Tag><span><Tag>{mat[1]}</Tag></span></p> :
                                            i % 3 === 0 ? <p><Tag color="orange">{`Material-${i + 1}`}:</Tag><span><Tag>{mat[1]}</Tag></span></p> :
                                                <p><Tag color="green">{`Material-${i + 1}`}:</Tag><span><Tag>{mat[1]}</Tag></span></p>
                                    : ''))}
                            </Card>
                        </Col>
                    }

                    {childs.length > 0 &&
                        <Col xl={{ span: 5, offset: 1 }} xs={{ span: 24, offset: 0 }}>
                            <Card title="Sub Campaigns" style={{ width: '100%' }}>
                                {childs.map((v, i) => <p key={i}><span>{i + 1}: </span> {v.name}</p>)}
                            </Card>
                        </Col>
                    }
                </Row>
                <br />
                <Row className="trgt">
                    {campaign?.image_attachments[0] &&
                        <Col xl={{ span: 7, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                            <Card title="Image 1" style={{ width: '100%' }}>
                                <Image
                                    // width={250}
                                    src={`${process.env.REACT_APP_s3_cdn}${campaign?.image_attachments[0]}`}
                                    fallback={UnloadImage}
                                />

                            </Card>
                        </Col>
                    }
                    {campaign?.image_attachments[1] &&
                        <Col xl={{ span: 7, offset: 1 }} xs={{ span: 24, offset: 0 }}>
                            <Card title="Image 2" style={{ width: '100%' }}>
                                <Image
                                    // width={250}
                                    src={`${process.env.REACT_APP_s3_cdn}${campaign?.image_attachments[1]}`}
                                    fallback={UnloadImage}
                                />
                            </Card>
                        </Col>
                    }
                    {campaign?.video_attachments?.length > 0 &&
                        <Col xl={{ span: 7, offset: 1 }} xs={{ span: 24, offset: 0 }}>
                            <Card title="Video Links" style={{ width: '100%' }}>
                                {campaign?.video_attachments.map((v, i) => <p key={i}><span>{i + 1}: </span> <a href={`${process.env.REACT_APP_s3_cdn}${v}`} target="_blank">Video {i + 1}</a></p>)}
                            </Card>
                        </Col>
                    }
                </Row>
                <br />
                <Row>
                    <Col xl={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                        <Card title="Locations" style={{ width: '100%' }}>
                            <p><Badge status="default" /><span style={{ color: '#004f9f' }}>Regions: </span> {location.region}</p>
                            <p><Badge status="default" /><span style={{ color: '#004f9f' }}>Area: </span> {location.area}</p>
                            <p><Badge status="default" /><span style={{ color: '#004f9f' }}>Territory: </span> {location.territory}</p>
                            <p><Badge status="default" /><span style={{ color: '#004f9f' }}>Distribution House: </span> {location.dHouse}</p>
                            <p><Badge status="default" /><span style={{ color: '#004f9f' }}>Distribution Point: </span> {location.dPoint}</p>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xl={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                        <Card title="Survey Object" style={{ width: '100%' }}>
                            <p>{JSON.stringify(campaign?.survey_flow)}</p>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xl={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                        <Card title="Conditions" style={{ width: '100%' }}>
                            <p>{JSON.stringify(campaign?.conditions)}</p>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xl={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                        <Card title="Supervisor Flow" style={{ width: '100%' }}>
                            <p>{JSON.stringify(campaign?.supervisor_flow)}</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Spin>
    );
}

export default CampaignInfo;
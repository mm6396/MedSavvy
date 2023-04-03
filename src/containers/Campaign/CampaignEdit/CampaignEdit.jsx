import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Row, Col, Select, Button, DatePicker, Slider, Upload, message, Checkbox, Spin, InputNumber } from 'antd';
import { PlusCircleOutlined, CheckOutlined, VideoCameraFilled, LoadingOutlined, ArrowsAltOutlined, FileImageFilled } from '@ant-design/icons';

import notification from "../../../util/Notification/Notification";
import ErrorHandler from '../../../util/ErrorHandler/ErrorHandler'
import { CampaignManagerAPI, RoleManagerAPI } from '../../../util/ApiGateway/Api';
import moment from 'moment';

import './CampaignEdit.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;
export const areas = ["Dhaka", "Ctg"];

const CampaignEdit = () => {

    let history = useHistory();
    const { id } = useParams();
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checked, setCheckbox] = useState(false);
    const [another, setAnother] = useState(false);
    const [region, setRegion] = useState([]);
    const [area, setArea] = useState([]);
    const [territory, setTerritory] = useState([]);
    const [d_house, setDhouse] = useState([]);
    const [dpid, setDPID] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [target, setTarget] = useState({ callTarget: { franchise: 0, sob: 0 }, swapping: { franchise: 0, sob: 0 }, ptr: 0, checkback: 0 });
    const [jsonError, setError] = useState('');
    const [condjsonError, setCondError] = useState('');
    const [supjsonError, setSupError] = useState('');
    const [regionValue, setRegionValue] = useState([]);
    const [areaValue, setAreaValue] = useState([]);
    const [territoryValue, setTerritoryValue] = useState([]);
    const [d_houseValue, setDhouseValue] = useState([]);
    const [dpidValue, setDPIDValue] = useState([]);
    const [campaign, setCampaign] = useState();
    const [fileList, setFileList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [spin, setSpin] = useState(false);
    const [numberValidate, setNumberValidate] = useState(false);
    const [resetFlag, setResetFlag] = useState(true);
    const [swpError, setSwpError] = useState('');
    const [swpSOBError, setSwpSOBError] = useState('');
    const [ptrError, setPtrError] = useState('');
    const [ptrTarget, setPtrTarget] = useState({ptr_1: 0, ptr_2: 0, ptr_3: 0})


    const [form] = Form.useForm();

    useEffect(() => {

        document.title = 'Prism CRM Creating Campaign';

        window.scrollTo(0, 0);

    }, []);

    const resetLocation = (params) => {
        setResetFlag(false);
        setArea([]);
        setTerritory([]);
        setDhouse([]);
        setDPID([]);
        form.setFieldsValue({
            region: [],
            area: [],
            territory: [],
            distribution: [],
            point: []
        });
    };

    useEffect(() => {
        (async () => {
            try {

                const { data } = await RoleManagerAPI.get('/campaign-filterInformation', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                let regionArr = [];
                if (data.response.length > 0) {
                    data.response.forEach(element => {
                        let temObj = { id: element.region_id, name: element.region }
                        if (regionArr.some(obj => obj.id === element.region_id)) {
                            return;
                        } else {
                            regionArr.push(temObj);
                        }
                    });
                    setRegion([...regionArr]);
                }
                setFilter([...data.response]);
            } catch (error) {
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {

                const { data } = await CampaignManagerAPI.get('/get-campaign-list', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                    }
                });
                setCampaigns([...data.response.filter(i => !i.parent)]);
            } catch (error) {
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                setSpin(true);
                if (filter.length > 0) {
                    const { data } = await CampaignManagerAPI.get(`/get-campaign/${id}`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                        }
                    });
                    console.log(data);
                    setFileList(data.campaignInfo?.image_attachments.map((v, i) => {
                        return {
                            uid: i,
                            name: v,
                            image_name: v,
                            status: 'done',
                            url: `${process.env.REACT_APP_s3_cdn}${v}`,
                            thumbUrl: `${process.env.REACT_APP_s3_cdn}${v}`
                        }
                    }));

                    setVideoList(data.campaignInfo?.video_attachments.map((v, i) => {
                        return {
                            uid: i,
                            name: v,
                            video_name: v,
                            status: 'done',
                            url: `${process.env.REACT_APP_s3_cdn}${v}`,
                            thumbUrl: `${process.env.REACT_APP_s3_cdn}${v}`
                        }
                    }));

                    let regionArr = [];
                    let areaArr = [];
                    let territoryArr = [];
                    let distributionArr = [];
                    let pointArr = [];
                    if (data.campaignLocations.length > 0) {
                        data.campaignLocations.forEach(element => {
                            if (regionArr.includes(element.region_id)) {
                                return;
                            } else {
                                regionArr.push(element.region_id);
                            }
                        });
                    }
                    if (data.campaignLocations.length > 0) {
                        data.campaignLocations.forEach(element => {
                            if (areaArr.includes(element.area_id)) {
                                return;
                            } else {
                                areaArr.push(element.area_id);
                            }
                        });
                    }
                    if (data.campaignLocations.length > 0) {
                        data.campaignLocations.forEach(element => {
                            if (territoryArr.includes(element.territory_id)) {
                                return;
                            } else {
                                territoryArr.push(element.territory_id);
                            }
                        });
                    }
                    if (data.campaignLocations.length > 0) {
                        data.campaignLocations.forEach(element => {
                            if (distributionArr.includes(element.dsid)) {
                                return;
                            } else {
                                distributionArr.push(element.dsid);
                            }
                        });
                    }
                    if (data.campaignLocations.length > 0) {
                        data.campaignLocations.forEach(element => {
                            if (pointArr.includes(element.dpid)) {
                                return;
                            } else {
                                pointArr.push(element.dpid);
                            }
                        });
                    }
                    let area = onChangeHandler(regionArr, 0).map(v => v.id);
                    let territory = onAreaChangeHandler(area, 0).map(v => v.id);
                    let distribution = onTerritoryChangeHandler(territory, 0).map(v => v.id);
                    let point = onDhouseChangeHandler(distribution, 0).map(v => v.id);

                    setRegionValue([...regionArr]);
                    setAreaValue([...areaArr]);
                    setTerritoryValue([...territoryArr]);
                    setDhouseValue([...distributionArr]);
                    setDPIDValue([...pointArr]);
                    setCampaign(data.campaignInfo);
                    setCheckbox(data.campaignInfo.parent ? true : false);
                    setTarget({
                        callTarget: {
                            franchise: data.campaignInfo.franchise_call_trgt,
                            sob: data.campaignInfo.sob_call_trgt
                        },
                        swapping: {
                            franchise: data.campaignInfo.franchise_swapping_trgt,
                            sob: data.campaignInfo.sob_swapping_trgt
                        },
                        ptr: data.campaignInfo.ptr_trgt,
                        checkback: data.campaignInfo.checkback_target
                    })
                    setPtrTarget({
                        ptr_1: data.campaignInfo.material ? data.campaignInfo.material[0].target : null,
                        ptr_2: data.campaignInfo.material ? data.campaignInfo.material[1].target : null,
                        ptr_3: data.campaignInfo.material ? data.campaignInfo.material[2].target : null
                    })

                    form.setFieldsValue({
                        name: data.campaignInfo.name,
                        cluster_count: data.campaignInfo.cluster_count,
                        max_franchise_target: data.campaignInfo.max_franchise_target,
                        max_sob_target: data.campaignInfo.max_sob_target,
                        remember: data.campaignInfo.parent ? true : false,
                        parent: data.campaignInfo.parent,
                        number_validation: data.campaignInfo.number_validation,
                        ptr_trgt: data.campaignInfo.ptr_trgt,
                        region: regionArr,
                        area: areaArr,
                        territory: territoryArr,
                        d_house: distributionArr,
                        point: pointArr,
                        date_range: [moment(data.campaignInfo.from_date), moment(data.campaignInfo.to_date)],
                        checkback_target: data.campaignInfo.checkback_target,
                        franchise_call_trgt: data.campaignInfo.franchise_call_trgt,
                        sob_call_trgt: data.campaignInfo.sob_call_trgt,
                        franchise_swapping_trgt: data.campaignInfo.franchise_swapping_trgt,
                        sob_swapping_trgt: data.campaignInfo.sob_swapping_trgt,
                        survey_flow: JSON.stringify(data.campaignInfo.survey_flow, undefined, 2),
                        conditions: JSON.stringify(data.campaignInfo.conditions, undefined, 2),
                        supervisor_flow: JSON.stringify(data.campaignInfo.supervisor_flow, undefined, 2),
                        mat_1:data.campaignInfo.material ?  data.campaignInfo.material[0].mat_1 : null,
                        mat_2: data.campaignInfo.material ? data.campaignInfo.material[1].mat_2 : null,
                        mat_3: data.campaignInfo.material ? data.campaignInfo.material[2].mat_3 : null,
                        ptr_trgt_1: data.campaignInfo.material ? data.campaignInfo.material[0].target : null,
                        ptr_trgt_2: data.campaignInfo.material ? data.campaignInfo.material[1].target : null,
                        ptr_trgt_3: data.campaignInfo.material ? data.campaignInfo.material[2].target : null,
                    });
                }
                setSpin(false);
            } catch (error) {
                if (error?.response?.data?.message) {
                    ErrorHandler(error?.response?.data?.message, history);
                    notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                } else {
                    notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                }
            }
        })();
    }, [filter]);

    function onChangeHandler(value, flag) {
        let areaArr = [];
        if (filter.length > 0) {
            // console.log(value);
            filter.forEach(element => {
                if (value.includes(element.region_id)) {
                    let temObj = { id: element.area_id, name: element.area, region_id: element.region_id }
                    if (areaArr.some(obj => obj.id === element.area_id)) {
                        return;
                    } else {
                        areaArr.push(temObj);
                    }
                }
            });
            setArea([...areaArr]);
            // if (flag) {
            //         // console.log(regionValue);
            //         // console.log(areaValue);
            //         let regionTemp = regionValue;
            //         let areaTemp = areaValue;


            //         if (regionValue.some(item => value.includes(item))) {
            //                 regionTemp = regionValue.filter(i => value.includes(i));
            //                 areaTemp = areaArr.filter(i => regionTemp.includes(i.region_id)).map(v => v.id).filter(i => areaValue.includes(i));

            //                 setRegionValue(regionTemp);
            //                 setAreaValue(areaTemp);
            //         } else if (value.length >= 0) {
            //                 setRegionValue([]);
            //                 setAreaValue([]);

            //                 regionTemp = []
            //                 areaTemp = []
            //         }
            //         let area = areaArr.filter(i => !regionTemp.includes(i.region_id)).map(v => v.id);
            //         form.setFieldsValue({ area: [...areaTemp, ...area] });
            // }

            // console.log(areaArr);
            onAreaChangeHandler(areaArr.map(v => v.id), 0);
            form.setFieldsValue({ area: areaArr.map(v => v.id) });


            // let distribution = onTerritoryChangeHandler(territory).map(v => v.id);
            // let point = onDhouseChangeHandler(distribution).map(v => v.id);
        }
        return areaArr;
    };

    function onAreaChangeHandler(value, flag) {
        let territoryArr = [];
        if (filter.length > 0) {
            // console.log(value);
            filter.forEach(element => {
                if (value.includes(element.area_id)) {
                    let temObj = { id: element.territory_id, name: element.territory, area_id: element.area_id }
                    if (territoryArr.some(obj => obj.id === element.territory_id)) {
                        return;
                    } else {
                        territoryArr.push(temObj);
                    }
                }
            });
            setTerritory([...territoryArr]);

            // if (flag) {
            //         let areaTemp = areaValue;
            //         let territoryTemp = territoryValue;

            //         if (areaValue.some(item => value.includes(item))) {
            //                 areaTemp = areaValue.filter(i => value.includes(i));
            //                 territoryTemp = territoryArr.filter(i => areaTemp.includes(i.area_id)).map(v => v.id).filter(i => territoryValue.includes(i));

            //                 setAreaValue(areaTemp);
            //                 setTerritoryValue(territoryTemp);
            //         } else if (value.length >= 0) {
            //                 setAreaValue([]);
            //                 setTerritoryValue([]);

            //                 areaTemp = []
            //                 territoryTemp = []
            //         }
            //         let territory = territoryArr.filter(i => !areaTemp.includes(i.area_id)).map(v => v.id);
            //         form.setFieldsValue({ territory: [...territoryTemp, ...territory] });
            // }

            let territory = territoryArr.map(v => v.id);
            form.setFieldsValue({ territory });
            onTerritoryChangeHandler(territoryArr.map(v => v.id), 0);
            // let distribution = onTerritoryChangeHandler(territory).map(v => v.id);
            // let point = onDhouseChangeHandler(distribution).map(v => v.id);
        }
        return territoryArr;
    };

    function onTerritoryChangeHandler(value, flag) {
        let d_HouseArr = [];
        if (filter.length > 0) {
            filter.forEach(element => {
                if (value.includes(element.territory_id)) {
                    let temObj = { id: element.dsid, name: element.distribution_house }
                    if (d_HouseArr.some(obj => obj.id === element.dsid)) {
                        return;
                    } else {
                        d_HouseArr.push(temObj);
                    }
                }
            });
            setDhouse([...d_HouseArr]);


            // if (flag) {
            //         // console.log(regionValue);
            //         // console.log(areaValue);
            //         let territoryTemp = territoryValue;
            //         let d_HouseTemp = d_houseValue;


            //         if (territoryValue.some(item => value.includes(item))) {
            //                 territoryTemp = territoryValue.filter(i => value.includes(i));
            //                 d_HouseTemp = d_HouseArr.filter(i => territoryTemp.includes(i.territory_id)).map(v => v.id).filter(i => d_houseValue.includes(i));

            //                 setTerritoryValue(territoryTemp);
            //                 setDhouseValue(d_HouseTemp);
            //         } else if (value.length >= 0) {
            //                 setTerritoryValue([]);
            //                 setDhouseValue([]);

            //                 territoryTemp = []
            //                 d_HouseTemp = []
            //         }
            //         let dHouse = d_HouseArr.filter(i => !territoryTemp.includes(i.territory_id)).map(v => v.id);
            //         form.setFieldsValue({ dHouse: [...d_HouseTemp, ...dHouse] });
            // }

            let distribution = d_HouseArr.map(v => v.id);
            form.setFieldsValue({ distribution });
            onDhouseChangeHandler(d_HouseArr.map(v => v.id));
        }
        return d_HouseArr;
    };

    function onDhouseChangeHandler(value, flag) {
        let areaArr = [];
        if (filter.length > 0) {
            // console.log(value);
            filter.forEach(element => {
                if (value.includes(element.dsid)) {
                    let temObj = { id: element.dpid, name: element.distribution_point }
                    if (areaArr.some(obj => obj.id === element.dpid)) {
                        return;
                    } else {
                        areaArr.push(temObj);
                    }
                }
            });
            setDPID([...areaArr]);
            let point = areaArr.map(v => v.id);
            form.setFieldsValue({ point });
        }
        return areaArr;
    };

    const onCheck = () => {
        setCheckbox(!checked)
    };


    const IsConditionJson = (e) => {
        try {
            var o = JSON.parse(e.target.value);
            if (o && typeof o === "object") {
                setCondError('')
                return o;
            }
        }
        catch (e) {
            setCondError('Your script must be in a valid Json format')
        }
        return false;
    };

    const IsSupFlowJson = (e) => {
        try {
            var o = JSON.parse(e.target.value);
            if (o && typeof o === "object") {
                setSupError('')
                return o;
            }
        }
        catch (e) {
            setSupError('Your script must be in a valid Json format')
        }
        return false;
    };

    const IsJsonString = (e) => {
        try {
            var o = JSON.parse(e.target.value);
            if (o && typeof o === "object") {
                setError('')
                return o;
            }
        }
        catch (e) {
            setError('Your script must be a valid Json format')
        }
        return false;
    };

    const videoProps = {
        name: 'Campaigns-Videos',
        multiple: true,
        action: `${process.env.REACT_APP_ecrm_ff_manager}/upload/files`,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("accessToken")
        },
        fileList: videoList,
        beforeUpload: file => {
            if (file.type !== 'video/mp4') {
                notification(`${file.name} is not a mp4 file`, 'Please upload a correct mp4 file', 'error');
            }
            return file.type === 'video/mp4';
        },
        onChange(info) {
            let fileList = [...info.fileList];

            // 1. Limit the number of uploaded files
            // Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-2);

            // 2. Read from response and show file link
            fileList = fileList.map(file => {
                if (file.response) {
                    // Component will show file.url as link
                    file.url = process.env.REACT_APP_s3_cdn + file.response.file_name;
                    file.video_name = file.response.file_name;
                    file.md5 = file.response.md5
                }
                return file;
            });

            setVideoList(fileList.filter(file => !!file.status));
        }
    };
    const imageProps = {
        name: 'Campaigns-Images',
        multiple: true,
        action: `${process.env.REACT_APP_ecrm_ff_manager}/upload/files`,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem("accessToken")
        },
        listType: "picture",
        fileList: fileList,
        beforeUpload: file => {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/svg+xml') {
                notification(`${file.name} is not an image`, 'Please upload a correct image file', 'error');
            }
            return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';
        },
        onChange(info) {
            let fileList = [...info.fileList];

            // 1. Limit the number of uploaded files
            // Only to show two recent uploaded files, and old ones will be replaced by the new
            fileList = fileList.slice(-2);

            // 2. Read from response and show file link
            fileList = fileList.map(file => {
                if (file.response) {
                    // Component will show file.url as link
                    file.url = process.env.REACT_APP_s3_cdn + file.response.file_name;
                    file.image_name = file.response.file_name;
                }
                return file;
            });

            setFileList(fileList.filter(file => !!file.status));
        }
    };

    const onFranchiseCallTrgtChange = (val) => {
        form.setFieldsValue({
            max_franchise_target: val
        })
        if (target.callTarget.franchise + target.callTarget.sob > target.ptr) {
            setTarget({ ...target, callTarget: { franchise: val, sob: target.callTarget.sob } })
        } else {
            setTarget({ ...target, ptr: 0, callTarget: { franchise: val, sob: target.callTarget.sob } })
            form.setFieldsValue({
                ptr_trgt: 0
            })
        }

         if (val + target.callTarget.sob < ptrTarget.ptr_1 +  ptrTarget.ptr_2 + ptrTarget.ptr_3) {
            setPtrError('Total PTR target cannot exceed total call target!')
        } else {
            setPtrError('');
        }

        if (target.swapping.franchise > val) {
            setSwpError('Swapping franchise cant be greater than call target franchise')
        } else {
            setSwpError('')
        }
    };


    const onSobCallTrgtChange = (val) => {
        form.setFieldsValue({
            max_sob_target: val
        })
        if (target.callTarget.franchise + target.callTarget.sob > target.ptr) {
            setTarget({ ...target, callTarget: { franchise: target.callTarget.franchise, sob: val } })
        } else {
            setTarget({ ...target, ptr: 0, callTarget: { franchise: target.callTarget.franchise, sob: val } })
            form.setFieldsValue({
                ptr_trgt: 0
            })
        }

        if (val + target.callTarget.franchise < ptrTarget.ptr_1 +  ptrTarget.ptr_2 + ptrTarget.ptr_3) {
            setPtrError('Total PTR target cannot exceed total call target!')
        } else {
            setPtrError('');
        }

        if (target.swapping.sob > val) {
            setSwpSOBError('Swapping sob cant be greater than call target sob')
        } else {
            setSwpSOBError('')
        }
    };

    const onSobSwappingChange = (value) => {
        setTarget({ ...target, swapping: { franchise: target.swapping.franchise, sob: value } });
        // if (target.swapping.franchise + value > target.callTarget.franchise + target.callTarget.sob) {
        //     setSwpError('Swapping cant be greater than call target')
        // } else {
        //     setSwpError('')
        // }
        if (value > target.callTarget.sob) {
            setSwpSOBError('Swapping sob cant be greater than call target sob')
        } else {
            setSwpSOBError('')
        }
    };

    const onFranchiseSwappingChange = (value) => {
        setTarget({ ...target, swapping: { franchise: value, sob: target.swapping.sob } });
        // if (value + target.swapping.sob > target.callTarget.franchise + target.callTarget.sob) {
        //     setSwpError('Swapping cant be greater than call target')
        // } else {
        //     setSwpError('')
        // }
        if (value > target.callTarget.franchise) {
            setSwpError('Swapping franchise cant be greater than call target franchise')
        } else {
            setSwpError('')
        }
    };

    const onPtr1TargetSet = (v) => {
        setPtrTarget({...ptrTarget, ptr_1: v});
        let total = v + ptrTarget.ptr_2 + ptrTarget.ptr_3;
        if(total > target.callTarget.franchise + target.callTarget.sob) {
            setPtrError('Total PTR target cannot exceed total call target!')
        } else {
            setPtrError('');
        }
    };

    const onPtr2TargetSet = (v) => {
        setPtrTarget({...ptrTarget, ptr_2: v});
        let total = v + ptrTarget.ptr_1 + ptrTarget.ptr_3;
        if(total > target.callTarget.franchise + target.callTarget.sob) {
            setPtrError('Total PTR target cannot exceed total call target!')
        } else {
            setPtrError('');
        }
    };

    const onPtr3TargetSet = (v) => {
        setPtrTarget({...ptrTarget, ptr_3: v});
        let total = v + ptrTarget.ptr_1 + ptrTarget.ptr_2;
        if(total > target.callTarget.franchise + target.callTarget.sob) {
            setPtrError('Total PTR target cannot exceed total call target!')
        } else {
            setPtrError('');
        }
    };

    const onFinish = async (fieldsValue) => {
        if (target.checkback !== 0) {
            if (swpError == '' && swpSOBError == ''  && ptrError == '') {
                try {
                    if (fileList.find(i => i.error)) {
                        notification('Image Upload Failed', 'Please upload a image successfully or remove the failed images', 'error');
                    }
                    else if (videoList.find(i => i.error)) {
                        notification('Video Upload Failed', 'Please upload a video successfully or remove the failed videos', 'error');
                    } else {
                        setLoading(true);
                        const rangeValue = fieldsValue['date_range'];
                        console.log(fileList);
                        const values = {
                            ...fieldsValue,
                            material: [
                                {
                                    mat_1: fieldsValue.mat_1 || null,
                                    target: fieldsValue.ptr_trgt_1 || null
                                },
                                {
                                    mat_2: fieldsValue.mat_2 || null,
                                    target: fieldsValue.ptr_trgt_2 || null
                                },
                                {
                                    mat_3: fieldsValue.mat_3 || null,
                                    target: fieldsValue.ptr_trgt_3 || null
                                }
                            ],
                            materialPrevious: {
                                mat_1: fieldsValue.mat_1,
                                mat_2: fieldsValue.mat_2,
                                mat_3: fieldsValue.mat_3
                            },
                            'dpid': fieldsValue.point,
                            'date_range': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
                            version: campaign?.version,
                            campaign_id: id,
                            'image': fileList.map(v => v.image_name),
                            'video': videoList.map(v => { return { "name": v.video_name, "md5": v.md5 } }),
                            'number_validation': true
                        };
                        const { data } = await CampaignManagerAPI.post('/update-survey', values, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem("accessToken")
                            }
                        });
                        notification(data.response, `Campaign Updated successfully`, 'success');
                        setLoading(false)
                        if (another) {
                            form.resetFields();
                        } else {
                            history.push(`/manager/campaign/info/${id}`);
                        }
                    }
                } catch (error) {
                    setLoading(false);
                    if (error?.response?.data?.message) {
                        ErrorHandler(error?.response?.data?.message, history);
                        notification(error?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
                    }
                    else {
                        notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
                    }
                }
            } else {
                notification('Swapping or PTR cannot be greater than call target', 'Please check your inputs', 'error');
            }
        } else {
            notification('Call checkback target must be greater than 0', 'Please check your inputs', 'warning');
        }
    };

    return (
        <Spin spinning={spin}>
            <div className="campaign-create-form">
                <Form name="basic"
                    onFinish={onFinish}
                    form={form}
                >
                    <Row>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 7, offset: 0 }}>
                            <div>
                                <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Add Campaign </h5>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'type here' }]} >
                                    <Input placeholder="enter campaing name.." />
                                </Form.Item>
                            </div>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                                    <Form.Item name="remember" valuePropName="checked">
                                        <Checkbox style={{ color: '#00B1EB', fontSize: '12px' }} checked={checked} onChange={onCheck} className="exapndparent-text">Sub-Campaigns</Checkbox>
                                    </Form.Item>
                                    {checked ?
                                        <Form.Item name="parent" rules={[{ required: true }]} >
                                            <Select allowClear showSearch optionFilterProp="children" showArrow={<ArrowsAltOutlined />}
                                                style={{ width: '100%' }} placeholder="Select Campaign" >
                                                {campaigns?.map((campaign, i) => {
                                                    return <Option key={i} value={campaign.id}>{campaign.name} {campaign.version}</Option>;
                                                })}
                                            </Select>
                                        </Form.Item> : ''}
                                </Col>
                                {/* <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
                                    <Form.Item name="number_validation" valuePropName="checked">
                                        <Checkbox style={{ color: '#00B1EB', fontSize: '12px' }} checked={checked} onChange={onValidateNumber} className="exapndparent-text">Number Validation</Checkbox>
                                    </Form.Item>
                                </Col> */}
                            </Row>
                            <div>
                                <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Set Campaign Date Range </h5>
                                <Form.Item name="date_range" rules={[{ type: 'array', required: true, message: 'Please select time!' }]}>
                                    <RangePicker />
                                </Form.Item>
                            </div>
                            <div>
                                <h5 className='required' style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Call Target({target.callTarget.franchise + target.callTarget.sob})</h5>
                                <Form.Item label={`Franchise ( ${target.callTarget.franchise} )`} name="franchise_call_trgt">
                                    <Slider max={100} onChange={onFranchiseCallTrgtChange} />
                                </Form.Item>
                                <Form.Item label={`Sob ( ${target.callTarget.sob} )`} name="sob_call_trgt">
                                    <Slider max={100} onChange={onSobCallTrgtChange} />
                                </Form.Item>
                            </div>
                            <div>
                                <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Maximum Franchise Target</h5>
                                <Form.Item name="max_franchise_target" rules={[{ required: true, message: 'Missing Input!' }]}>
                                    <InputNumber min={target.callTarget.franchise} style={{ width: '57%' }} />
                                </Form.Item>
                            </div>
                            <div>
                                <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Maximum SOB Target</h5>
                                <Form.Item name="max_sob_target" rules={[{ required: true, message: 'Missing Input!' }]}>
                                    <InputNumber min={target.callTarget.sob} style={{ width: '57%' }} />
                                </Form.Item>
                            </div>
                            <br />
                            <div>
                                {ptrError ? <div style={{ fontSize: '14px', color: '#ff4d4f' }}>{ptrError}</div> : ''}
                                <div>
                                    <h5 style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>PTR 1</h5>
                                    <Form.Item name="mat_1" label="TAG">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="ptr_trgt_1" label="TARGET">
                                        <InputNumber onChange = {onPtr1TargetSet} min = {0} max={target.callTarget.franchise + target.callTarget.sob} />
                                    </Form.Item>
                                </div>
                                <div>
                                    <h5 style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>PTR 2</h5>
                                    <Form.Item name="mat_2" label="TAG">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="ptr_trgt_2" label="TARGET">
                                        <InputNumber onChange = {onPtr2TargetSet} min = {0} max={target.callTarget.franchise + target.callTarget.sob} />
                                    </Form.Item>
                                </div>
                                <div>
                                    <h5 style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>PTR 3</h5>
                                    <Form.Item  name="mat_3" label="TAG">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="ptr_trgt_3" label="TARGET">
                                        <InputNumber onChange = {onPtr3TargetSet} min = {0} max={target.callTarget.franchise + target.callTarget.sob} />
                                    </Form.Item>
                                </div>
                            </div>
                            <br />
                            <div>
                                <h5 style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Swapping({target.swapping.franchise + target.swapping.sob})</h5>
                                {swpError ? <div style={{ fontSize: '14px', color: '#ff4d4f' }}>{swpError}</div> : ''}
                                <Form.Item label={`Franchise ( ${target.swapping.franchise} )`} name="franchise_swapping_trgt">
                                    <Slider max={100} onChange={onFranchiseSwappingChange} />
                                </Form.Item>
                                {swpSOBError ? <div style={{ fontSize: '14px', color: '#ff4d4f' }}>{swpSOBError}</div> : ''}
                                <Form.Item label={`Sob ( ${target.swapping.sob} )`} name="sob_swapping_trgt">
                                    <Slider max={100} onChange={onSobSwappingChange} />
                                </Form.Item>
                            </div>
                            <div>
                                <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Call Checkback Target ({target.checkback})</h5>
                                <Form.Item name="checkback_target" rules={[{ required: true, message: 'Please set call checkback target' }]}>
                                    <Slider max={target.callTarget.franchise + target.callTarget.sob} onChange={(val) => { setTarget({ ...target, checkback: val }) }} />
                                </Form.Item>
                            </div>
                            <div>
                                <h5 className="required" style={{ fontWeight: '600', color: '#004F9F', fontSize: '12px' }}>Cluster per BR</h5>
                                <Form.Item name="cluster_count" rules={[{ required: true, message: 'Missing Input!' }]}>
                                    <InputNumber min={1} style={{ width: '57%' }} />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 1 }}>
                            <Row gutter={[16, 16]}>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 1 }}>
                                    <Button type="primary" onClick={resetLocation}>Reset Location</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 1 }}>
                                    <h5 className="required" style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}> Region </h5>
                                    <Form.Item name="region" rules={[{ required: true }]} >
                                        <Select disabled={resetFlag} mode="multiple" maxTagCount={2} allowClear showSearch optionFilterProp="children" showArrow={<ArrowsAltOutlined />} onChange={onChangeHandler}
                                            style={{ width: '100%' }} placeholder="Type or select..." >
                                            {region.map((v, i) => <Option value={v.id} key={i}> {v.name} </Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 1 }}>
                                    <h5 className="required" style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}> Area </h5>
                                    <Form.Item name="area" rules={[{ required: true }]} >
                                        <Select disabled={resetFlag} mode="multiple" maxTagCount={2} allowClear showSearch optionFilterProp="children" showArrow={<ArrowsAltOutlined />} onChange={onAreaChangeHandler}
                                            style={{ width: '100%' }} placeholder="Type or select..." >
                                            {area.map((v, i) => <Option value={v.id} key={i}> {v.name} </Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 1 }}>
                                    <h5 className="required" style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}> Territory </h5>
                                    <Form.Item name="territory" rules={[{ required: true }]} >
                                        <Select disabled={resetFlag} mode="multiple" maxTagCount={2} allowClear showSearch optionFilterProp="children" showArrow={<ArrowsAltOutlined />} onChange={onTerritoryChangeHandler}
                                            style={{ width: '100%' }} placeholder="Type or select..." >
                                            {territory.map((v, i) => <Option value={v.id} key={i}> {v.name} </Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 1 }}>
                                    <h5 className="required" style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}> Distribution House </h5>
                                    <Form.Item name="distribution" rules={[{ required: true }]} >
                                        <Select disabled={resetFlag} mode="multiple" maxTagCount={2} allowClear showSearch optionFilterProp="children" showArrow={<ArrowsAltOutlined />} onChange={onDhouseChangeHandler}
                                            style={{ width: '100%' }} placeholder="Type or select..." >
                                            {d_house.map((v, i) => <Option value={v.id} key={i}> {v.name} </Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }}>
                                    <h4 className="required" style={{ color: '#8B8B8B', fontWeight: 'bold', fontSize: '12px' }}> Distribution Point </h4>
                                    <Form.Item name={"point"} rules={[{ required: true }]}>
                                        <Select disabled={resetFlag} showSearch maxTagCount={5} optionFilterProp="children" showArrow mode="multiple"
                                            placeholder="Type or select point" allowClear >
                                            {dpid.map((v, i) => <Option value={v.id} key={i}> {v.name} </Option>)}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 1 }}>
                                    <h5 style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}> Upload Image</h5>

                                    <Dragger {...imageProps}>
                                        <p className="ant-upload-drag-icon">
                                            <FileImageFilled />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint"></p>
                                    </Dragger>

                                </Col>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 1 }}>
                                    <h5 style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}> Upload video</h5>

                                    <Dragger {...videoProps}>
                                        <p className="ant-upload-drag-icon">
                                            <VideoCameraFilled />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint"></p>
                                    </Dragger>

                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }}>
                                    <h5 className="required" style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}>Survey Flow</h5>
                                    <Form.Item name="survey_flow" rules={[{ required: true, message: 'Enter Script' }]}  >
                                        <Input.TextArea className={jsonError ? 'jsonerror' : ''} rows="7" placeholder="Copy and paste json..." onChange={IsJsonString} />
                                    </Form.Item>
                                    {jsonError ? <div style={{ fontSize: '14px', color: '#ff4d4f' }}>{jsonError}</div> : ''}
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }}>
                                    <h5 className="required" style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}>Conditions </h5>
                                    <Form.Item name="conditions" rules={[{ required: true, message: 'Enter Script' }]}  >
                                        <Input.TextArea className={condjsonError ? 'jsonerror' : ''} rows="7" placeholder="Copy and paste json..." onChange={IsConditionJson} />
                                    </Form.Item>
                                    {condjsonError ? <div style={{ fontSize: '14px', color: '#ff4d4f' }}>{condjsonError}</div> : ''}
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 22, offset: 1 }}>
                                    <h5 className="required" style={{ fontWeight: 'bold', color: '#8B8B8B', fontSize: '12px' }}>Supervisor Flow</h5>
                                    <Form.Item name="supervisor_flow" rules={[{ required: true, message: 'Enter Script' }]}  >
                                        <Input.TextArea className={supjsonError ? 'jsonerror' : ''} rows="7" placeholder="Copy and paste json..." onChange={IsSupFlowJson} />
                                    </Form.Item>
                                    {supjsonError ? <div style={{ fontSize: '14px', color: '#ff4d4f' }}>{supjsonError}</div> : ''}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="button-row" style={{ margin: '50px 0 0 0', padding: '24px 0 0 0' }}>
                        {/* <Col xs={{ span: 24, offset: 0 }} md={{ span: 8, offset: 5 }} lg={{ span: 6, offset: 6 }}>
                            <Form.Item>
                                <Button className="add-btn" shape="round" icon={<PlusCircleOutlined />} htmlType="submit" size="middle"
                                    onClick={() => setAnother(true)}>
                                    Done & Add another Campaign {loading && <LoadingOutlined />}
                                </Button>
                            </Form.Item>
                        </Col> */}
                        <Col xs={{ span: 24, offset: 2 }} md={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 0 }}>
                            <Form.Item >
                                <Button className="assign-btn" shape="round" icon={<CheckOutlined />} htmlType="submit"
                                    onClick={() => setAnother(false)}>
                                    Update {loading && <LoadingOutlined />}
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Spin>
    );
}

export default CampaignEdit;
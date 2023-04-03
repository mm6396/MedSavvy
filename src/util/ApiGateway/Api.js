import axios from 'axios';


const  AuthAPI =  axios.create({
  baseURL: process.env.REACT_APP_BaseUrl
});

const FieldForceManagerAPI = axios.create({
  baseURL: process.env.REACT_APP_ecrm_ff_manager,
});

const RoleManagerAPI = axios.create({
  baseURL: process.env.REACT_APP_ecrm_role_manager
});

const CampaignManagerAPI = axios.create({
  baseURL: process.env.REACT_APP_ecrm_campaign_manager
});

const FaceMatchAPI = axios.create({
  baseURL : process.env.REACT_APP_ecrm_facial_recognition
})

const NotificationManager = axios.create({
  baseURL : process.env.REACT_APP_ecrm_notification_manager
})

const NCSalesAPI = axios.create({
  baseURL : process.env.REACT_APP_nc_sales
})

export {
  AuthAPI,
  FieldForceManagerAPI,
  RoleManagerAPI,
  CampaignManagerAPI,
  FaceMatchAPI,
  NotificationManager,
  NCSalesAPI
}
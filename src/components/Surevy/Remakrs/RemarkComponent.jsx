import React, { useState, useEffect, useContext } from "react";
import { Input, Row, Col, InputNumber } from "antd";
import { ViewContext } from "../../../Contexts/ViewContext";

const RemarkComponent = ({ va_type, sup_type, role }) => {
  const {
    name,
    setName,
    age,
    setAge,
    prof,
    setProf,
    email,
    setEmail,
  } = useContext(ViewContext);



  const onNameChange = (e,) => {
    setName( e.target.value)
} 

const onAgeChange = (e,) => {
  setAge( e)
} 


const onProfChange = (e,) => {
  setProf( e.target.value)
} 

const onEmailChange = (e,) => {
  setEmail( e.target.value)
} 

  return (
    <div>
      <Row>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
          <div>
            <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Name </h5>
            <Input  onChange={ (e) => onNameChange(e) } value={name} placeholder="enter campaign name.." />
          </div>
          <br/>
          <div>
          <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Age </h5>
          <InputNumber  onChange={ (e) => onAgeChange(e) } value={age} style={{width:'100%'}} placeholder="Enter Age" />
          </div>
        </Col>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 1 }}>
        <div>
            <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Profession </h5>
            <Input  onChange={ (e) => onProfChange(e) } value={prof} placeholder="enter profession.." />
          </div>
          <br/>
          <div>
          <h5 className="required" style={{ fontWeight: 'bold', color: '#004F9F', fontSize: '12px', }}> Email </h5>
          <Input  onChange={ (e) => onEmailChange(e) } value={email} placeholder="enter email.." />
          </div>
        </Col>

      </Row>
    </div>
  );
};

export default RemarkComponent;

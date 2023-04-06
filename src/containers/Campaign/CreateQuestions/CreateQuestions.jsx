import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {Form,Input,Button,Row,Col,Select,Space,Checkbox,Divider,Card,Spin,InputNumber,} from "antd";
import {RollbackOutlined, PlusOutlined, CloseOutlined, FileImageFilled, MinusCircleOutlined,} from "@ant-design/icons";
import ErrorHandler from "../../../util/ErrorHandler/ErrorHandler";
import CustomNotification from "../../../util/Notification/Notification";

import "./CreateQuestions.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CreateQuestions = () => {
  let history = useHistory();
  const { id } = useParams();
  const [form, optnform] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [campaign, setCampaign] = useState("");
  const [isCorrect, setIscorrect] = useState(false);
  const [removedData, setRemovedData] = useState([]);
  const [oldData, setOldData] = useState([]);

  const location = useLocation();

  useEffect(() => {
    document.title = "AuditAI Questions";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchQusData();
    setCampaign(location?.state);
  }, []);

  const fetchQusData = async () => {
    try {
      setLoading(true);
      setRemovedData([]);
      const { data } = await axios.get(
        `http://localhost:8001/api/v1/campaignRouter/get-questions/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      console.log("qus data", data);
      if (data.data?.length > 0) {
        const temp = data?.data?.map((v, i) => {
          let options = {},
            ids = {};
          v.options.forEach((element, index) => {
            const { id, option_text } = element;
            ids[`opt_id_${index + 1}`] = id;
            options[`optn_${index + 1}`] = option_text;
          });
          return {
            id: v.id,
            ques_text: v.q_text,
            isMulti: v.isMultipleAns == 1 ? true : false,
            ...ids,
            ...options
          };
        });

        console.log("temp", temp);
        setOldData([...temp]);
        form.setFieldsValue({
          questions: temp,
        });
      }
      setLoading(false);
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
  }

  const formatOldData = (data) => {
    console.log(data)
    return data.map((v, i) => {
      let options = [];

      for (let i = 1; i <= 6; i++) {
        if (v[`optn_${i}`]) {
          options.push({
            id: v[`opt_id_${i}`],
            option: v[`optn_${i}`]
          });
        }
      }
      return {
        id: v.id,
        isMulti: v.isMulti == true ? 1 : 0,
        options: options,
        ques: v.ques_text.trim()
      };
    });
  };

  const onFinish = async (values) => {
    console.log(removedData)
    const formatedOldData = formatOldData(oldData);
    let restriction = false;

    let finalBodyData = [];
    [...removedData, ...values.questions].map((v, i) => {
      console.log(v)
      let options = [];

      for (let i = 1; i <= 6; i++) {
      
        if (v[`optn_${i}`]) {
          console.log(v[`opt_id_${i}`],v[`optn_${i}`])
          options.push({
            id: v[`opt_id_${i}`],
            option: v[`optn_${i}`]
          });
        }
      }
console.log(options)
      const tempObj = {
        id: v.id,
        isMulti: v.isMulti == true ? 1 : 0,
        options,
        ques: v.ques_text.trim()
      };

      const pos = formatedOldData.findIndex((el) => el.id === v.id);
      if (pos === -1) {
        finalBodyData.push({
          ...tempObj,
          status: "new",
        });
      } else {
        if (i < removedData?.length) {
          finalBodyData.push({
            ...tempObj,
            status: "removed",
          });
        } else if (
          JSON.stringify(tempObj) !== JSON.stringify(formatedOldData[pos])
        ) {
          finalBodyData.push({
            ...tempObj,
            status: "modify",
          });
        }
      }

      if (options.length < 2) {
        restriction = true;
      }
    });

    if (restriction) {
      return CustomNotification(
        "Warning",
        "You have to select at least two option in each question",
        "warning"
      );
    }

    if (!finalBodyData.length) {
      return CustomNotification(
        "Warning",
        "You have to select at least one question",
        "warning"
      );
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        'http://localhost:8001/api/v1/campaignRouter/create-questions',
        { campaign: +id, questions: finalBodyData },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      console.log(data);
      setRemovedData([]);
      await fetchQusData();
      CustomNotification(
        "Successful",
        `Questions saved successfully`,
        "success"
      );
      setLoading(false);
      // history.push(`/manager/creation/campaign-list`);
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

  const onCorrectOptionChange = (e) => {
    setIscorrect(e.target.checked);
  };

  const storeRemovedData = (pos) => {
    const formData = form.getFieldValue("questions");
    console.log(formData)
    formData[pos]["status"] = "removed";
    setRemovedData([...removedData, formData[pos]]);
  };

  return (
    <Spin spinning={loading}>
      <h1
        style={{
          textAlign: "center",
          color: "cadetblue",
          fontSize: "22px",
          textDecorationLine: "underline",
        }}
      >
        Create Call Verification Questions -{" "}
        <span style={{ color: "#004d80" }}>{campaign}</span>
      </h1>
      <div className="segment-create" style={{ margin: "20px 60px 0 60px" }}>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          initialValues={{ questions: [" "], option: [" "] }}
          form={form}
        >
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    style={{ position: "relative", marginBottom: "50px" }}
                  >
                    <Divider orientation="left">Quesion {index + 1}</Divider>
                    <Space
                      direction="vertical"
                      key={field.key}
                      style={{ display: "flex" }}
                      align="center"
                    >
                      <Space
                        style={{
                          display: "flex",
                          position: "absolute",
                          top: 0,
                          right: 0,
                          margin: "15px",
                        }}
                        align="baseline"
                      >
                        {fields.length > 1 && (
                          <CloseOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => {
                              storeRemovedData(field.name);
                              remove(field.name);
                            }}
                          />
                        )}
                      </Space>
                      <Space style={{ display: "flex" }}>
                        <Form.Item
                          {...field}
                          name={[field.name, "ques_text"]}
                          fieldKey={[field.fieldKey, "ques_text"]}
                          rules={[
                            { required: true, message: "Missing Question" },
                          ]}
                        >
                          <Input.TextArea
                            disabled={disabled}
                            className="ques-text-area"
                            placeholder="type question"
                            rows={3}
                          />
                        </Form.Item>
                      </Space>
                      <Form.Item
                        {...field}
                        name={[field.name, "isMulti"]}
                        fieldKey={[field.fieldKey, "isMulti"]}
                        valuePropName="checked"
                      >
                        <Checkbox
                          checked={isCorrect}
                          onChange={onCorrectOptionChange}
                          style={{ color: "#004d80", fontWeight: "500" }}
                        >
                          Has Mutiple Answer
                        </Checkbox>
                      </Form.Item>
                      {/*<Space
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "weight"]}
                          fieldKey={[field.fieldKey, "weight"]}
                          rules={[
                            { required: true, message: "Missing weight" },
                          ]}
                        >
                          <InputNumber
                            disabled={true}
                            min={0}
                            style={{ width: "100%" }}
                            placeholder="weight of the question"
                          />
                        </Form.Item>
                      </Space>*/}

                      {[1, 2, 3, 4, 5, 6].map((v, optnindex) => {
                        return (
                          <div
                            key={index}
                            style={{ display: "flex", alignItems: "baseline" }}
                          >
                            <Space style={{ display: "flex" }} align="baseline">
                              <Form.Item
                                {...field}
                                name={[field.name, `optn_${optnindex + 1}`]}
                                fieldKey={[
                                  field.fieldKey,
                                  `optn_${optnindex + 1}`,
                                ]}
                                // rules={[{ required: true, message: `write option ${optnindex+1}` }]}
                              >
                                <Input
                                  disabled={disabled}
                                  placeholder="Write Option"
                                />
                              </Form.Item>
                            </Space>
                            {/* <Space
                              style={{ display: "flex", margin: "0 0 0 5px" }}
                              align="baseline"
                            >
                              <Form.Item
                                {...field}
                                name={[
                                  field.name,
                                  `weight_optn_${optnindex + 1}`,
                                ]}
                                fieldKey={[
                                  field.fieldKey,
                                  `weight_optn_${optnindex + 1}`,
                                ]}
                                // rules={[{ required: true, message: 'Missing weight' }]}
                              >
                                <InputNumber
                                  disabled={disabled}
                                  min={0}
                                  style={{ width: "100%" }}
                                  placeholder="weight of the option"
                                />
                              </Form.Item>
                            </Space> */}
                          </div>
                        );
                      })}
                    </Space>
                  </Card>
                ))}
                <br />
                <Form.Item style={{ textAlign: "center" }}>
                  <Button
                    style={{ width: "9rem" }}
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <Form.Item>
              <Button
                shape="round"
                size="large"
                type="primary"
                htmlType="submit"
              >
                Save Questionnaire
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default CreateQuestions;

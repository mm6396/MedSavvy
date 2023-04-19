import React, { useContext, useEffect, useState } from "react";
import { Radio, Checkbox } from "antd";
import { ViewContext } from "../../../Contexts/ViewContext";
import "./Questions.scss";

const Questions = ({arr}) => {
  const {
    quesArr,
    setQuesarr,
    selectedVal,
    setSelectedval,
    ansArr,
    setAnsArr,
    checked,
    setChecked,
  } = useContext(ViewContext);

  const handleAnswerOptionClick = (e, ques_id, que, ans) => {
    let val = e.target.value;
    let arr = [];
    let obj = { val, ques_id, que, ans };
    arr.push(obj);

    let objnew = quesArr.findIndex(
      (x) => x.ques_id === obj.ques_id && x.val === obj.val
    );
    let objexist = quesArr.findIndex(
      (x) => x.ques_id === obj.ques_id && x.val !== obj.val
    );

    if (objnew === -1 && objexist === -1) {
      setQuesarr(quesArr.concat(arr));
      setSelectedval(selectedVal.concat([{ id: ques_id, val }]));

    } else if (objexist >= 0) {
      quesArr.splice(objexist, 1);
      setQuesarr(quesArr.concat(arr));
      const position = selectedVal.findIndex(
        (element) => element.id == ques_id
      );
      selectedVal[position].val = e.target.value;
    }
  };

  const onCheckBoxChange = (e, ques_id, aid, op) => {
    // console.log("checkbox", e, ques_id, aid, op);
    if (e.length == 0) {
      // console.log('ans arr', ansArr);
      let arr = ansArr.filter((v) => v.aid !== aid);
      // console.log('new',arr);
      let check = arr.map(v=> v.check);
      // console.log('check',check);
      setAnsArr(arr);
      setChecked(check);
    } else {
      setChecked([...checked, e[0]]);
      setAnsArr([
        ...ansArr,
        { aid: aid, ques_id: ques_id, ans: op, check:e[0] },
      ]);
    }
  };

  return (
    <div className="question">
      <div style={{ width: "100%" }}>
        { arr.length > 0 && 
        arr.map((i, index1) => {
          return (
            <div key={index1} className="question-div">
              <p style={{ fontSize: "15px", fontWeight: "600" }}>
                {" "}
                {i.q_text}{" "}
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {i.options.map((op, ai) => {
                  const position = selectedVal.findIndex(
                    (element) => element.id == i.id
                  );
                  const selectedValue =
                    position !== -1 ? selectedVal[position].val : "";

                  return i.isMultipleAns == 1 ? (
                    <Checkbox.Group
                      key={ai}
                      onChange={(e) =>
                        onCheckBoxChange(
                          e,
                          i.id,
                          `ques-${index1 + 1}-option-${ai + 1}`,
                          op.option_text
                        )
                      }
                      value={checked}
                    >
                      <Checkbox
                       value={`ques-${index1 + 1}-option-${ai + 1}`}
                       >
                         {op.option_text}
                      </Checkbox>
                    </Checkbox.Group>
                  ) : (
                    <Radio.Group
                      key={ai}
                      name={index1}
                      onChange={(e) =>
                        handleAnswerOptionClick(
                          e,
                          i.id,
                          i.q_text,
                          op.option_text
                        )
                      }
                      value={selectedValue}
                    >
                      <Radio
                        name={index1}
                        value={`ques-${index1 + 1}-option-${ai + 1}`}
                      >
                        {op.option_text}
                      </Radio>
                    </Radio.Group>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;

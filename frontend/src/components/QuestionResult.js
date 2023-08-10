import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import FormContainer from "./FormContainer";
// import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { submitAnswers } from "../actions/questionActions";
import { useTranslation } from "react-i18next";
// import { checkAnswers } from "../actions/testActions";

const QuestionResult = ({ questionId, questionText, answers, image }) => {
  const { t } = useTranslation();
  const checkedAnswers = useSelector((state) => state.checkedAnswers);
  const { summary } = checkedAnswers;
  // const dispatch = useDispatch();
  // const { id: testId } = useParams();

  useEffect(() => {
    // if (!summary) {
    //   dispatch(checkAnswers({ testId }));
    // } else {
    // }
  }, []);

  const submitHandler = (e) => {};

  const checkHandler = (id) => {
    if (summary?.summary) {
      let question = summary.summary.find(
        (question) => question.questionId === questionId
      );
      return question.submittedAnswers?.some((answer) => answer._id === id);
    } else return false;
  };
  const checkCorrectHandler = (id) => {
    if (summary?.summary) {
      let question = summary.summary.find(
        (question) => question.questionId === questionId
      );
      return question.correctAnswers.some((answer) => answer._id === id);
    } else return false;
  };

  return (
    <div className="text-start ">
      <FormContainer>
        <Form onSubmit={submitHandler} className="border w-100">
          <Form.Group className="pt-2">
            <Form.Label className="fw-bold">{questionText}</Form.Label>
            {answers
              ? answers.map((answer) => (
                  <Form.Check
                    className={`fw-normal fs-6 ${
                      checkCorrectHandler(answer._id) ? "text-success" : ""
                    }`}
                    // disabled={true}
                    key={answer._id}
                    label={answer.answerText}
                    type="checkbox"
                    checked={checkHandler(answer._id)}
                    onChange={(e) => {}}
                  ></Form.Check>
                ))
              : ""}
          </Form.Group>
        </Form>
      </FormContainer>
      <div className="text-center">
        <img src={image} className="w-75" alt=""></img>
      </div>
    </div>
  );
};

export default QuestionResult;

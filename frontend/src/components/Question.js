import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitAnswers } from "../actions/questionActions";
import { useTranslation } from "react-i18next";

const Question = ({ questionId, questionText, answers, image }) => {
  const { t } = useTranslation();
  const [selectedAnswersTest, setSelectedAnswersTest] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const dispatch = useDispatch();
  const { id: testId } = useParams();

  useEffect(() => {}, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const answeredQuestion = {
      _id: questionId,
      selectedAnswers: selectedAnswers,
    };
    dispatch(
      submitAnswers({
        testId,
        answeredQuestion,
      })
    );
    setSelectedAnswers([]);
  };

  const updateSelectedAnswers = (checked, answer) => {
    if (checked) {
      setSelectedAnswers((prevSelectedAnswers) => [
        ...prevSelectedAnswers,
        answer,
      ]);
      setSelectedAnswersTest((prevSelectedAnswers) => [
        ...prevSelectedAnswers,
        answer,
      ]);
    } else {
      setSelectedAnswersTest((prevSelectedAnswers) =>
        prevSelectedAnswers.filter((ans) => ans._id !== answer._id)
      );
      setSelectedAnswers((prevSelectedAnswers) =>
        prevSelectedAnswers.filter((ans) => ans._id !== answer._id)
      );
    }
  };

  const checkHandler = (id) => {
    return selectedAnswersTest.some((ans) => ans._id === id);
  };

  return (
    <div className="text-start ">
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group className="pt-2">
            <Form.Label className="fw-bold">{questionText}</Form.Label>
            {answers
              ? answers.map((answer) => (
                  <Form.Check
                    className={`fw-normal fs-6 ${
                      checkHandler(answer._id) ? "text-warning" : ""
                    }`}
                    key={answer._id}
                    label={answer.answerText}
                    type="checkbox"
                    checked={checkHandler(answer._id)}
                    onChange={(e) => {
                      updateSelectedAnswers(e.target.checked, answer);
                    }}
                  ></Form.Check>
                ))
              : ""}
          </Form.Group>

          <Button
            type="submit"
            variant="warning"
            className="text-center my-2 rounded"
          >
            {t("save")}
          </Button>
        </Form>
      </FormContainer>
      <div className="text-center">
        <img src={image} className="img-fluid" alt=""></img>
      </div>
    </div>
  );
};

export default Question;

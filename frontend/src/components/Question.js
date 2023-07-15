import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitAnswers } from "../actions/questionActions";
import { useTranslation } from "react-i18next";

const Question = ({ questionId, questionText, answers, image }) => {
  const { t } = useTranslation();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: testId } = useParams();

  useEffect(() => {}, [selectedAnswers]);

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
  };

  const updateSelectedAnswers = (checked, answer) => {
    if (checked) {
      selectedAnswers.push(answer);
      setSelectedAnswers(selectedAnswers);
    } else {
      const updatedAnswers = selectedAnswers.filter(
        (ans) => ans._id !== answer._id
      );
      setSelectedAnswers(updatedAnswers);
    }
  };
  return (
    <div className="text-start">
      <Row>
        {" "}
        <Col>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="question" className="pt-2">
                <Form.Label>{questionText}</Form.Label>
                {answers
                  ? answers.map((answer) => (
                      <Form.Check
                        key={answer._id}
                        label={answer.answerText}
                        type="checkbox"
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
                {t("update")}
              </Button>
            </Form>
          </FormContainer>
        </Col>
        <Col>
          {" "}
          <img className="img-fluid w-50 p-3" src={image} alt=""></img>
        </Col>
      </Row>
    </div>
  );
};

export default Question;

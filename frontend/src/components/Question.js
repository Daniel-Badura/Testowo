import React from "react";
import { Col, Row } from "react-bootstrap";

const Question = ({ questionText, answers, image }) => {
  return (
    <div className="text-center">
      <Row>
        {" "}
        <Col>
          <legend>{questionText}</legend>

          {answers
            ? answers.map((answer) => (
                <p className="text-start checkbox-container">
                  <input type="checkbox" name={answer._id} id={answer._id} />
                  <label className="checkbox-label" htmlFor={answer._id}>
                    {answer.answerText}
                  </label>
                </p>
              ))
            : ""}

          <label htmlFor="track">{}</label>
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

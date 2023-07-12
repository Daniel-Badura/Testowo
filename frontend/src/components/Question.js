import React from "react";

const Question = ({ questionText, answers, image }) => {
  return (
    <div>
      <img src={image} alt=""></img>
      <h3>{questionText}</h3>
      <ul>
        {answers ? answers.map((answer) => <li>{answer.answerText}</li>) : ""}
      </ul>
    </div>
  );
};

export default Question;

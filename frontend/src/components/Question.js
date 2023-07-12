import React from "react";

const Question = ({ questionText, answers, image }) => {
  return (
    <div className="text-center">
      <img className="img-fluid w-75 p-3" src={image} alt=""></img>
      <fieldset>
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
        <br />
      </fieldset>
    </div>
  );
};

export default Question;

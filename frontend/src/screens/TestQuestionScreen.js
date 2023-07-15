import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getTestQuestionDetails,
  submitAnswers,
} from "../actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";

const TestQuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [questionNumber, setQuestionNumber] = useState(0);
  const testQuestionDetails = useSelector((state) => state.testQuestionDetails);
  const { loading, test } = testQuestionDetails;

  // const { answers: selectedAnswers } = submitedAnswers;

  const { id: testId } = useParams();

  useEffect(() => {
    // if (test) {
    //   dispatch(TEST_QUESTION_DETAILS_RESET);
    // }
  }, []);
  const beginTestHandler = () => {
    dispatch(getTestQuestionDetails({ testId }));
    navigate(`/tests/${testId}/test?question=${questionNumber}`);
  };
  const previousQuestionHandler = () => {
    if (questionNumber > 0) {
      // dispatch(
      //   submitAnswers({
      //     testId,
      //     selectedAnswers,
      //   })
      // );
      setQuestionNumber(questionNumber - 1);
    } else {
    }
    navigate(`/tests/${testId}/test?question=${questionNumber}`);
  };
  const nextQuestionHandler = () => {
    if (questionNumber < test.questions.length - 1) {
      // dispatch(
      //   submitAnswers({
      //     testId,
      //     selectedAnswers,
      //   })
      // );
      setQuestionNumber(questionNumber + 1);
    } else {
    }
    navigate(`/tests/${testId}/test?question=${questionNumber}`);
  };
  const finishTestHandler = () => {};
  const { t } = useTranslation();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-center my-4">
          {test ? (
            <div>
              <h1>{test.name}</h1>
              <Question
                questionText={test.questions[questionNumber].content}
                questionId={test.questions[questionNumber]._id}
                answers={test.questions[questionNumber].answers}
                image={test.questions[questionNumber].image}
              />
              <Button
                className="my-3 rounded"
                variant="success"
                onClick={previousQuestionHandler}
              >
                {t("previous")}
              </Button>
              <Button
                className="my-3 rounded"
                variant="success"
                onClick={nextQuestionHandler}
              >
                {t("next")}
              </Button>
              <Button
                className="my-3 rounded"
                variant="danger"
                onClick={finishTestHandler}
              >
                {t("finish")}
              </Button>
            </div>
          ) : (
            ""
          )}

          {/* <Question questionText={}/> */}

          {!test ? (
            <Button
              className="my-3 rounded"
              variant="success"
              onClick={beginTestHandler}
            >
              {t("begin")}
            </Button>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default TestQuestionScreen;

import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  getQuestionDetails,
  getTestQuestionDetails,
} from "../actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";
import { TEST_QUESTION_DETAILS_RESET } from "../constants/questionConstants";

const TestQuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState(0);
  const testQuestionDetails = useSelector((state) => state.testQuestionDetails);
  const { loading, test } = testQuestionDetails;
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
  const nextQuestionHandler = () => {
    setQuestionNumber(questionNumber + 1);
    navigate(`/tests/${testId}/test?question=${questionNumber}`);
  };
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
                answers={test.questions[questionNumber].answers}
                image={test.questions[questionNumber].image}
              />
              <Button
                className="my-3 rounded"
                variant="success"
                onClick={nextQuestionHandler}
              >
                {t("next")}
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

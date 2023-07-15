import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTestQuestionDetails } from "../actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";

const TestQuestionScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const questionIndex = Number(searchParams.get("question"));

  const [questionNumber, setQuestionNumber] = useState(questionIndex);
  const testQuestionDetails = useSelector((state) => state.testQuestionDetails);
  const { loading, test } = testQuestionDetails;
  const { id: testId } = useParams();

  useEffect(() => {
    dispatch(getTestQuestionDetails({ testId }));
  }, [testId, dispatch, navigate]);

  // const beginTestHandler = () => {
  //   dispatch(getTestQuestionDetails({ testId }));
  //   navigate(`/tests/${testId}/test?question=${questionNumber}`);
  // };
  const previousQuestionHandler = () => {
    if (questionNumber > 0) {
      const newQuestionNumber = questionNumber - 1;
      navigate(`/tests/${testId}/test?question=${newQuestionNumber}`);
      setQuestionNumber(newQuestionNumber);
    }
  };
  const nextQuestionHandler = () => {
    if (questionNumber < test.questions.length - 1) {
      const newQuestionNumber = questionNumber + 1;
      navigate(`/tests/${testId}/test?question=${newQuestionNumber}`);
      setQuestionNumber(newQuestionNumber);
    }
  };
  const finishTestHandler = () => {};
  const { t } = useTranslation();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-center my-4 vh-100 ">
          {test ? (
            <div>
              <h1>{test.name}</h1>
              <h4>
                {t("question") +
                  " " +
                  (questionIndex + 1) +
                  "/" +
                  test.questions.length}
              </h4>
              <Question
                questionText={test.questions[questionIndex].content}
                questionId={test.questions[questionIndex]._id}
                answers={test.questions[questionIndex].answers}
                image={test.questions[questionIndex].image}
              />
              <div className="d-flex justify-content-between mx-5 px-5">
                <Button
                  className="my-3 rounded"
                  variant="success"
                  onClick={previousQuestionHandler}
                >
                  {t("previous")}
                </Button>

                <Button
                  className="my-3 rounded"
                  variant="danger"
                  onClick={finishTestHandler}
                >
                  {t("finish")}
                </Button>
                <Button
                  className="my-3 rounded"
                  variant="success"
                  onClick={nextQuestionHandler}
                >
                  {t("next")}
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* <Question questionText={}/> */}

          {/* {!test ? (
            <Button
              className="my-3 rounded"
              variant="success"
              onClick={beginTestHandler}
            >
              {t("begin")}
            </Button>
          ) : (
            ""
          )} */}
        </div>
      )}
    </>
  );
};

export default TestQuestionScreen;

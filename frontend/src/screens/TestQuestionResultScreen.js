import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTestQuestionDetails } from "../actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";
import { checkAnswers } from "../actions/testActions";
import QuestionResult from "../components/QuestionResult";

const TestQuestionResultScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const questionIndex = Number(searchParams.get("question"));
  const checkedAnswers = useSelector((state) => state.checkedAnswers);
  const { summary } = checkedAnswers;
  const [questionNumber, setQuestionNumber] = useState(questionIndex);
  const testQuestionDetails = useSelector((state) => state.testQuestionDetails);
  const { loading, test } = testQuestionDetails;
  const { id: testId } = useParams();

  useEffect(() => {
    dispatch(getTestQuestionDetails({ testId }));
  }, [testId, dispatch, navigate]);

  const previousQuestionHandler = () => {
    if (questionNumber > 0) {
      const newQuestionNumber = questionNumber - 1;
      navigate(`/tests/${testId}/test/check?question=${newQuestionNumber}`);
      setQuestionNumber(newQuestionNumber);
    }
  };
  const nextQuestionHandler = () => {
    if (questionNumber < test.questions.length - 1) {
      const newQuestionNumber = questionNumber + 1;
      navigate(`/tests/${testId}/test/check?question=${newQuestionNumber}`);
      setQuestionNumber(newQuestionNumber);
    }
  };

  const { t } = useTranslation();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-center my-4 ">
          {test && summary ? (
            <h1 className="text-danger fs-1 fw-2">
              Final Score: {summary.score}/{test.questions.length}
            </h1>
          ) : (
            ""
          )}
          {test ? (
            <div>
              <h1>{test.name}</h1>

              <div className="d-flex justify-content-between mx-5 px-5">
                <Button
                  className="my-3 rounded"
                  variant="success"
                  onClick={previousQuestionHandler}
                >
                  {t("previous")}
                </Button>

                {/* <Button
                  className="my-3 rounded"
                  variant="danger"
                  onClick={finishTestHandler}
                >
                  {t("finish")}
                </Button> */}
                <h4 className="my-auto">
                  {t("question") +
                    " " +
                    (questionIndex + 1) +
                    "/" +
                    test.questions.length}
                </h4>
                <Button
                  className="my-3 rounded"
                  variant="success"
                  onClick={nextQuestionHandler}
                >
                  {t("next")}
                </Button>
              </div>
              <QuestionResult
                questionText={test.questions[questionIndex].content}
                questionId={test.questions[questionIndex]._id}
                answers={test.questions[questionIndex].answers}
                image={test.questions[questionIndex].image}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default TestQuestionResultScreen;

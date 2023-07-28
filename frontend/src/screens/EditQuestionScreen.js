import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnswer,
  deleteAnswer,
  getQuestionDetails,
  updateQuestion,
} from "../actions/questionActions";
import axios from "axios";
import Loader from "../components/Loader";
import {
  ANSWER_CREATE_RESET,
  QUESTION_DETAILS_RESET,
  QUESTION_UPDATE_RESET,
} from "../constants/questionConstants";

const EditQuestionScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: testId, qid: questionId } = useParams();
  const [content, setContent] = useState("");
  const [answers, setAnswers] = useState([]);
  const [image, setImage] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [uploading, setUploading] = useState("");
  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question } = questionDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const questionUpdate = useSelector((state) => state.questionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = questionUpdate;

  const answerCreate = useSelector((state) => state.answerCreate);
  const {
    loading: loadingAnswer,
    success: successAnswerCreate,
    createdAnswer,
  } = answerCreate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUESTION_UPDATE_RESET });
      navigate(`/admin/tests/${testId}/questions/${questionId}/edit`);
    } else if (successAnswerCreate) {
      // setAnswers(...answers, createdAnswer);
      // dispatch({ type: QUESTION_UPDATE_RESET });
      // dispatch({ type: ANSWER_CREATE_RESET });
      dispatch(getQuestionDetails({ testId, questionId }));
    } else {
      if (!question || question._id !== questionId) {
        dispatch(getQuestionDetails({ testId, questionId }));
      } else {
        if (!answers.length) {
          // Check if answers state is empty

          setCorrectAnswers(question.correctAnswers);
          setAnswers(question.answers);
        }
        setContent(question.content);
        setImage(question.image);
      }
    }
  }, [
    dispatch,
    testId,
    navigate,
    successUpdate,
    questionId,
    question,
    successAnswerCreate,
    answers,

    createdAnswer,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateQuestion({
        testId,
        questionId,
        question: { content, image, answers, correctAnswers },
      })
    );
    dispatch({ type: ANSWER_CREATE_RESET });
    dispatch({ type: QUESTION_UPDATE_RESET });
    dispatch({ type: QUESTION_DETAILS_RESET });
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data.filename);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const createAnswerHandler = () => {
    dispatch(createAnswer({ testId, questionId }));
  };

  const deleteAnswerHandler = (index, answer) => {
    if (window.confirm(`Confirm removing ${index}`)) {
      dispatch(deleteAnswer({ testId, questionId, answerId: answer._id }));
      const updatedAnswers = answers.filter((ans) => ans._id !== answer._id);
      setAnswers(updatedAnswers);
      const updatedCorrectAnswers = correctAnswers.filter(
        (correctAnswer) => correctAnswer._id !== answer._id
      );
      setCorrectAnswers(updatedCorrectAnswers);
      dispatch({ type: QUESTION_DETAILS_RESET });
    }
  };
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { ...updatedAnswers[index], answerText: value };
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswers = (answer, checked) => {
    const answersCorrect = correctAnswers.filter((answer) =>
      answers.find((ans) => ans._id === answer._id)
    );
    if (checked) {
      const updatedCorrectAnswers = answersCorrect.filter(
        (correctAnswer) => correctAnswer._id !== answer._id
      );

      setCorrectAnswers([...updatedCorrectAnswers, answer]);
    } else {
      // Remove the answer from correctAnswers
      const updatedCorrectAnswers = answersCorrect.filter(
        (correctAnswer) => correctAnswer._id !== answer._id
      );
      setCorrectAnswers(updatedCorrectAnswers);
    }
  };

  return (
    <>
      <Link
        to={`/admin/tests/${testId}/questions`}
        className="btn btn-light my-3 rounded btn-outline-warning"
      >
        {t("return")}
      </Link>
      <FormContainer>
        <h1>{t("editTestQuestionScreen.editQuestion")}</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="content" className="textarea-autosize">
            <Form.Label>{t("question")}</Form.Label>
            <Form.Control
              rows={5}
              className="fs-6 fw-bold rounded"
              as="textarea"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <hr />
          <Form.Group controlId="image" className="">
            <div className="d-flex align-items-center justify-content-between">
              {/* <Form.Label>{t("image")}</Form.Label> */}
              <div>
                <Form.Control
                  className="fs-5 rounded"
                  type="string"
                  placeholder="Image url"
                  disabled={true}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                  className="fs-5 rounded"
                  type="file"
                  label="Choose File"
                  onChange={uploadFileHandler}
                ></Form.Control>
              </div>
              <div>
                {image ? (
                  <img
                    style={{ maxWidth: "100px" }}
                    className="img-fluid rounded"
                    src={image}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </Form.Group>

          {question.answers
            ? question.answers.map((answer, index) => (
                <Row key={answer._id}>
                  <Col className="col-9 mx-auto">
                    <Form.Group controlId={`answers`} className=" fs-5">
                      <Form.Label>{t("answer") + " " + index}</Form.Label>
                      <Form.Control
                        className="fs-5 d-flex my-1"
                        as="textarea"
                        rows={4}
                        placeholder={`answer_${index}`}
                        value={answers[index]?.answerText || ""}
                        onChange={(e) =>
                          handleAnswerChange(index, e.target.value)
                        }
                      ></Form.Control>
                      <div className="d-flex align-items-center justify-content-between">
                        <div></div>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col className="my-auto col-1 mx-auto">
                    <div>
                      <Button
                        variant="outline-danger"
                        className="btn-sm rounded"
                        onClick={() => {
                          deleteAnswerHandler(index, answer);
                        }}
                      >
                        <i className="fas fa-trash big" />
                      </Button>
                      <Form.Check
                        type="checkbox"
                        label={t("correct")}
                        checked={correctAnswers.some(
                          (correctAnswer) => correctAnswer._id === answer._id
                        )}
                        onChange={(e) =>
                          handleCorrectAnswers(answer, e.target.checked)
                        }
                      />
                    </div>
                  </Col>
                  <hr></hr>
                </Row>
              ))
            : ""}
          {uploading && <Loader />}

          <Button
            type="submit"
            variant="primary"
            className="text-center my-2 rounded"
          >
            {t("update")}
          </Button>
          <Button
            className="my-3 rounded"
            variant="success"
            onClick={createAnswerHandler}
          >
            <i className="fas fa-plus"> </i> {t("editQuestionScreen.addAnswer")}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditQuestionScreen;

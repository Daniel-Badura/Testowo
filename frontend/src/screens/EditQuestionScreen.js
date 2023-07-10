import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
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
  const { loading: loadingAnswer, success: successAnswerCreate } = answerCreate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUESTION_UPDATE_RESET });
      navigate(`/admin/tests/${testId}/questions`);
    } else if (successAnswerCreate) {
      dispatch({ type: ANSWER_CREATE_RESET });
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

  const deleteAnswerHandler = (index) => {
    if (window.confirm(`Confirm removing ${index}`)) {
      dispatch(deleteAnswer({ testId, questionId, index }));
    }
  };
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { ...updatedAnswers[index], answerText: value };
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswers = (answer, checked) => {
    if (checked) {
      // Add the answer to correctAnswers
      setCorrectAnswers([...correctAnswers, answer]);
    } else {
      // Remove the answer from correctAnswers
      const updatedCorrectAnswers = correctAnswers.filter(
        (correctAnswer) => correctAnswer._id !== answer._id
      );
      setCorrectAnswers(updatedCorrectAnswers);
    }
  };

  return (
    <>
      <Link
        to={`/admin/tests/${testId}/questions`}
        className="btn btn-light my-3"
      >
        {t("return")}
      </Link>
      <FormContainer>
        <h1>{t("editTestQuestionScreen.editQuestion")}</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="content" className="pt-2">
            <Form.Label>{t("question")}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image" className="pt-2">
            <Form.Label>{t("image")}</Form.Label>
            <Form.Control
              type="string"
              placeholder="Image url"
              disabled={true}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              type="file"
              label="Choose File"
              onChange={uploadFileHandler}
            ></Form.Control>
            {question.answers
              ? question.answers.map((answer, index) => (
                  <Form.Group
                    key={answer._id}
                    controlId={`answers`}
                    className="pt-2"
                  >
                    <Form.Label>{t("answer") + " " + index}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`answer_${index}`}
                      value={answers[index]?.answerText || ""}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    ></Form.Control>
                    <Button
                      variant="outline-danger"
                      className="btn-sm rounded"
                      onClick={() => {
                        deleteAnswerHandler(index);
                      }}
                    >
                      <i className="fas fa-trash big" />
                    </Button>

                    <Form.Check
                      type="checkbox"
                      label="Correct"
                      checked={correctAnswers.some(
                        (correctAnswer) => correctAnswer._id === answer._id
                      )}
                      onChange={(e) =>
                        handleCorrectAnswers(answer, e.target.checked)
                      }
                    ></Form.Check>
                  </Form.Group>
                ))
              : ""}
            {uploading && <Loader />}
          </Form.Group>
          <Button type="submit" variant="primary" className="text-center my-2">
            {t("update")}
          </Button>
          <Button
            className="my-3"
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

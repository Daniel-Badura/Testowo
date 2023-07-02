import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { QUESTION_UPDATE_RESET } from "../constants/questionConstants";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  listQuestionDetails,
  updateQuestion,
} from "../actions/questionActions";

const EditQuestionScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: testId, qid: questionId } = useParams();
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState("");

  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question } = questionDetails;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = questionUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: QUESTION_UPDATE_RESET });
      navigate(`/admin/tests/${testId}/questions`);
    } else {
      if (!question || question._id !== questionId) {
        dispatch(listQuestionDetails(testId, questionId));
      } else {
        setContent(question.question);
        setImage(question.image);
      }
    }
    setMessage(null);
  }, [
    dispatch,
    question,
    questionId,
    navigate,
    testId,
    successUpdate,
    questionDetails,
  ]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateQuestion({
        _id: questionId,
        content,
        image,
      })
    );
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

  return (
    <>
      <Link to="/admin/tests/list" className="btn btn-light my-3">
        {t("editTestScreen.return")}
      </Link>
      <FormContainer>
        <h1>{t("editTestScreen.editQuestion")}</h1>
        {message && <Message variant="danger"> {message} </Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger"> {errorUpdate} </Message>}
        {}
        {error &&
          error.split(",").map((errorMessage) => (
            <Message key={errorMessage} variant="danger">
              {" "}
              {errorMessage.trim().replace("Path ", "")}{" "}
            </Message>
          ))}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="content" className="pt-2">
              <Form.Label>{t("question")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
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
              {uploading && <Loader />}
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="text-center my-2"
            >
              {t("update")}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditQuestionScreen;

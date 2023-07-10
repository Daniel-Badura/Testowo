import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { logout } from "../actions/userActions";
import {
  createQuestion,
  deleteQuestion,
  listQuestions,
} from "../actions/questionActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QUESTION_CREATE_RESET } from "../constants/questionConstants";
import Paginate from "../components/Paginate";
import { useTranslation } from "react-i18next";
const TestQuestionListScreen = () => {
  const { t } = useTranslation();
  const { pageNumber, id: testId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionDelete = useSelector((state) => state.questionDelete);
  const {
    success: deleted,
    error: deleteError,
    loading: deleteLoading,
  } = questionDelete;

  const questionCreate = useSelector((state) => state.questionCreate);
  const {
    success: created,
    error: createError,
    loading: createLoading,
    question: createdQuestion,
  } = questionCreate;

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions, page, pages } = questionList;

  useEffect(() => {
    dispatch({ type: QUESTION_CREATE_RESET });
    if (!userInfo && !userInfo.isAdmin) {
      dispatch(logout());
      navigate("/login");
    }
    if (created) {
      navigate(`/admin/tests/${testId}/questions/${createdQuestion._id}/edit`);
    } else {
      dispatch(listQuestions(testId));
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    deleted,
    created,
    pageNumber,
    testId,
    createdQuestion,
  ]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Confirm removing ${name}`)) {
      dispatch(deleteQuestion(testId, id));
    }
  };
  const createQuestionHandler = () => {
    dispatch(createQuestion(testId));
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <Link to="/admin/tests/list" className="btn btn-light my-3">
            {t("editTestScreen.return")}
          </Link>
          <Col>
            <h1>{t("questions")}</h1>
          </Col>
        </Col>
        <Col className="text-center">
          <Button
            className="my-3"
            variant="success"
            onClick={createQuestionHandler}
          >
            <i className="fas fa-plus"> </i>{" "}
            {t("editTestQuestionScreen.createQuestion")}
          </Button>
        </Col>
      </Row>
      {/* {deleted && <Message variant='success'>Successfully removed item</Message>} */}
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {createLoading && <Loader />}
      {createError && <Message variant="danger">{createError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm ">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>{t("question")}</th>
                <th>{t("image")}</th>
                <th>{t("answers")}</th>
                <th>{t("correctAnswers")}</th>
                <th>
                  {t("edit")}/{t("delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              {questions
                ? questions.map((question) => (
                    <tr key={question._id}>
                      <td>
                        {" "}
                        <a
                          href={`/admin/tests/${testId}/questions/${question._id}/edit`}
                        >
                          {question.content}{" "}
                        </a>
                      </td>
                      <td>{question.image}</td>
                      <td>{question.answers.length}</td>
                      <td>{question.correctAnswers.length}</td>
                      <td>
                        <Button
                          variant="outline-info"
                          className="btn-sm rounded"
                          onClick={() => {
                            navigate(
                              `/admin/tests/${testId}/questions/${question._id}/edit`
                            );
                          }}
                        >
                          <i className="fas fa-edit big" />
                        </Button>

                        <Button
                          variant="outline-danger"
                          className="btn-sm rounded"
                          onClick={() => {
                            deleteHandler(question._id, question.content);
                          }}
                        >
                          <i className="fas fa-trash big" />
                        </Button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default TestQuestionListScreen;

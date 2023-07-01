import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { logout } from "../actions/userActions";
import { createTest, deleteTest, listTests } from "../actions/testActions";
import { useNavigate, useParams } from "react-router-dom";
import { TEST_CREATE_RESET } from "../constants/testConstats";
import Paginate from "../components/Paginate";
import { useTranslation } from "react-i18next";
const TestListScreen = () => {
  const { t } = useTranslation();
  const { pageNumber } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testDelete = useSelector((state) => state.testDelete);
  const {
    success: deleted,
    error: deleteError,
    loading: deleteLoading,
  } = testDelete;

  const testCreate = useSelector((state) => state.testCreate);
  const {
    success: created,
    error: createError,
    loading: createLoading,
    test: createdTest,
  } = testCreate;

  const testList = useSelector((state) => state.testList);
  const { loading, error, tests, page, pages } = testList;

  useEffect(() => {
    dispatch({ type: TEST_CREATE_RESET });
    if (!userInfo && !userInfo.isAdmin) {
      dispatch(logout());
      navigate("/login");
    }
    if (created) {
      navigate(`/admin/tests/${createdTest._id}/edit`);
    } else {
      dispatch(listTests("", pageNumber));
    }
  }, [dispatch, userInfo, navigate, deleted, created, createdTest, pageNumber]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Confirm removing ${name}`)) {
      dispatch(deleteTest(id));
    }
  };
  const createTestHandler = () => {
    dispatch(createTest());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>{t("tests")}</h1>
        </Col>
        <Col className="text-center">
          <Button
            className="my-3"
            variant="success"
            onClick={createTestHandler}
          >
            <i className="fas fa-plus"> </i> Create Test
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
                <th>{t("name")}</th>
                <th>{t("price")}</th>
                <th>{t("category")}</th>
                <th>{t("brand")}</th>
                <th>
                  {t("edit")}/{t("delete")}
                </th>
              </tr>
            </thead>
            <tbody>
              {tests
                ? tests.map((test) => (
                    <tr key={test._id}>
                      {/* <td> <a href={`/tests/${test._id}`}>{test._id} </a></td> */}
                      <td>
                        {" "}
                        <a href={`/tests/${test._id}`}>{test.name} </a>
                      </td>
                      <td>{test.price}€</td>
                      <td>{test.category}</td>
                      <td>{test.brand}</td>
                      <td>
                        <Button
                          style={{ height: "100%" }}
                          variant="outline-info"
                          className="btn-sm rounded"
                          onClick={() => {
                            navigate(`/admin/tests/${test._id}/edit`);
                          }}
                        >
                          <i className="fas fa-edit big" />
                        </Button>

                        <Button
                          variant="outline-danger"
                          className="btn-sm rounded"
                          onClick={() => {
                            deleteHandler(test._id, test.name);
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
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default TestListScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { useTranslation } from "react-i18next";
import Test from "../components/Test";
import { listTests } from "../actions/testActions";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { keyword, pageNumber } = useParams();

  const testList = useSelector((state) => state.testList);
  const { loading, error, tests, pages, page } = testList;

  useEffect(() => {
    dispatch(listTests(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <React.Fragment>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {tests.map((test) => (
              <Col
                key={test._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="align-items-stretch d-flex"
              >
                <Test test={test} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
            source={"tests"}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;

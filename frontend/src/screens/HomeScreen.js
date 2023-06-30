import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { useTranslation } from "react-i18next";
import Test from "../components/Test";

const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const testList = useSelector((state) => state.testList);
  const { loading, error, tests } = testList;

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
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;

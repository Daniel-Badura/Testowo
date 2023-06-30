import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Rating as Stars } from "react-simple-star-rating";
import {
  createTestReview,
  listTestDetails,
  enrollTest,
} from "../actions/testActions";
import { REVIEW_CREATE_RESET } from "../constants/testConstats";
import Meta from "../components/Meta";
import { useTranslation } from "react-i18next";

const TestScreen = () => {
  const { t } = useTranslation();
  const { id: testId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const testDetails = useSelector((state) => state.testDetails);
  const { loading, error, test } = testDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = reviewCreate;

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (successReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: REVIEW_CREATE_RESET });
    }
    dispatch(listTestDetails(id));
  }, [dispatch, id, successReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTestReview(testId, {
        rating,
        comment,
      })
    );
  };
  const enrollTestHandler = () => {
    dispatch(enrollTest(test._id));
    navigate(`/tests/${test._id}/0`);
  };
  const ratingHandler = (rate) => {
    setRating(rate);
  };
  return (
    <>
      <Link className="btn btn-warning my-3 rounded" to="/">
        {t("return")}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={test.name} />
          <Row>
            <Col md={6}>
              <Image className="rounded shadowed" src={test.image} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{test.name}</h3>
                </ListGroupItem>
                <ListGroup.Item>
                  <Rating value={test.rating} text={test.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  {t("testScreen.description")}: {test.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup.Item>
                <Button
                  onClick={enrollTestHandler}
                  className="btn-success"
                  type="button"
                >
                  {t("testScreen.enrollTest")}
                </Button>
              </ListGroup.Item>
            </Col>
          </Row>
          <Row className="py-4">
            <Col md={6}>
              <h2>{t("testScreen.reviews")}</h2>
              {test.reviews.length === 0 && (
                <Message>{t("testScreen.noReviews")}</Message>
              )}
              <ListGroup variant="flush">
                {test.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <Card>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </Card>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <ListGroup.Item>
                <h2>{t("testScreen.writeReview")}</h2>
                {successReview && (
                  <Message variant="success">
                    {t("testScreen.reviewSubmitted")}
                  </Message>
                )}
                {loadingReview && <Loader />}
                {errorReview && (
                  <Message variant="danger">{errorReview}</Message>
                )}

                {userInfo && (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label> {t("rating")}</Form.Label>
                      {/* <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}> */}
                      <Stars onClick={ratingHandler} initialValue={rating} />
                      {/* </Form.Control> */}
                    </Form.Group>
                    <Form.Group controlId="rating">
                      <Form.Label>{t("testScreen.comment")}</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button className="my-3" type="submit" variant="success">
                      {t("submit")}
                    </Button>
                  </Form>
                )}
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default TestScreen;

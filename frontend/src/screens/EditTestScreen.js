import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { TEST_UPDATE_RESET } from "../constants/testConstants";
import { listTestDetails, updateTest } from "../actions/testActions";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EditTestScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: testId } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState("");
  const [featured, setFeatured] = useState("");

  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testDetails = useSelector((state) => state.testDetails);
  const { loading, error, test } = testDetails;

  const testUpdate = useSelector((state) => state.testUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = testUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TEST_UPDATE_RESET });
      navigate("/admin/tests/list");
    } else {
      if (!test.name || test._id !== testId) {
        dispatch(listTestDetails(testId));
      } else {
        setName(test.name);

        setImage(test.image);
        setBrand(test.brand);
        setDescription(test.description);
        setCategory(test.category);
        setFeatured(test.featured);
      }
    }
    setMessage(null);
  }, [dispatch, test, testId, navigate, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTest({
        _id: testId,
        name,
        image,
        brand,
        description,
        category,
        featured,
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
        <h1>{t("editTestScreen.editTest")}</h1>
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
            <Form.Group controlId="name" className="pt-2">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="pt-2">
              <Form.Label>{t("category")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="pt-2">
              <Form.Label>{t("description")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand" className="pt-2">
              <Form.Label>{t("brand")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
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
            <Form.Group controlId="featured" className="pt-2">
              <Form.Check
                type="checkbox"
                label="Featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <div className="d-flex align-items-center justify-content-between">
              <Button
                type="submit"
                variant="primary"
                className="text-center my-2"
              >
                {t("update")}
              </Button>
              <Link
                to={`/admin/tests/${testId}/questions`}
                className="btn btn-light my-3"
              >
                {t("editTestScreen.editQuestions")}
              </Link>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditTestScreen;

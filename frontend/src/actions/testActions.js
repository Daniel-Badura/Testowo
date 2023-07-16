import axios from "axios";
import {
  TEST_LIST_REQUEST,
  TEST_LIST_SUCCESS,
  TEST_LIST_FAIL,
  TEST_DETAILS_REQUEST,
  TEST_DETAILS_SUCCESS,
  TEST_DETAILS_FAIL,
  TEST_DELETE_REQUEST,
  TEST_DELETE_SUCCESS,
  TEST_DELETE_FAIL,
  TEST_CREATE_REQUEST,
  TEST_CREATE_SUCCESS,
  TEST_CREATE_FAIL,
  TEST_UPDATE_REQUEST,
  TEST_UPDATE_SUCCESS,
  TEST_UPDATE_FAIL,
  TEST_FEATURED_FAIL,
  TEST_FEATURED_SUCCESS,
  TEST_FEATURED_REQUEST,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  ENROLL_TEST_REQUEST,
  ENROLL_TEST_SUCCESS,
  ENROLL_TEST_FAIL,
  CHECK_ANSWERS_REQUEST,
  CHECK_ANSWERS_SUCCESS,
  CHECK_ANSWERS_FAIL,
} from "../constants/testConstants.js";
import {
  SUBMIT_ANSWERS_REQUEST,
  SUBMIT_ANSWERS_SUCCESS,
} from "../constants/questionConstants.js";

export const listTests =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: TEST_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/tests?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: TEST_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TEST_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listTestDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEST_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/tests/${id}`);
    dispatch({
      type: TEST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTest = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/tests", {}, config);
    dispatch({
      type: TEST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTest = (test) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/tests/${test._id}`, test, config);
    dispatch({
      type: TEST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTest = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/tests/${id}`, config);
    dispatch({
      type: TEST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TEST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const featuredTests = () => async (dispatch) => {
  try {
    dispatch({ type: TEST_FEATURED_REQUEST });
    const { data } = await axios.get("/api/tests/featured/");
    dispatch({
      type: TEST_FEATURED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_FEATURED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const enrollTest =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ENROLL_TEST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/tests/${id}/enroll`,
        userInfo,
        config
      );
      dispatch({
        type: ENROLL_TEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ENROLL_TEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const createTestReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/tests/${id}/review`,
      review,
      config
    );
    dispatch({
      type: REVIEW_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const checkAnswers =
  ({ testId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CHECK_ANSWERS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/tests/${testId}/test/check`,
        {},
        config
      );

      dispatch({
        type: CHECK_ANSWERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHECK_ANSWERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

import axios from "axios";
import {
  QUESTION_DELETE_FAIL,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_REQUEST,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  ANSWER_CREATE_REQUEST,
  ANSWER_CREATE_SUCCESS,
  ANSWER_CREATE_FAIL,
} from "../constants/questionConstants.js";

export const listQuestions = (testId) => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_LIST_REQUEST });
    const { data } = await axios.get(`/api/tests/${testId}/questions`);
    dispatch({
      type: QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getQuestionDetails =
  ({ testId, questionId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: QUESTION_DETAILS_REQUEST,
      });
      const { data } = await axios.get(
        `/api/tests/${testId}/questions/${questionId}`
      );
      dispatch({
        type: QUESTION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createQuestion = (testId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_CREATE_REQUEST,
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
      `/api/tests/${testId}/questions`,
      {},
      config
    );
    dispatch({
      type: QUESTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateQuestion =
  ({ testId, questionId, question }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_UPDATE_REQUEST,
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
        `/api/tests/${testId}/questions/${questionId}`,
        question,
        config
      );
      dispatch({
        type: QUESTION_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteQuestion =
  (testId, questionId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_DELETE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(
        `/api/tests/${testId}/questions/${questionId}`,
        config
      );
      dispatch({
        type: QUESTION_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createAnswer =
  ({ testId, questionId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ANSWER_CREATE_REQUEST,
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
        `/api/tests/${testId}/questions/${questionId}/`,
        {},
        config
      );
      dispatch({
        type: ANSWER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ANSWER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

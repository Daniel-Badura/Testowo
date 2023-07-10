import {
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_CREATE_RESET,
  QUESTION_UPDATE_RESET,
  ANSWER_CREATE_REQUEST,
  ANSWER_CREATE_SUCCESS,
  ANSWER_CREATE_FAIL,
  ANSWER_CREATE_RESET,
  ANSWER_DELETE_REQUEST,
  ANSWER_DELETE_SUCCESS,
  ANSWER_DELETE_FAIL,
  QUESTION_DETAILS_RESET,
} from "../constants/questionConstants.js";

export const questionListReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case QUESTION_LIST_REQUEST:
      return { loading: true, questions: [] };
    case QUESTION_LIST_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };
    case QUESTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionDetailsReducer = (
  state = { question: { answers: [], correctAnswers: [] } },
  action
) => {
  switch (action.type) {
    case QUESTION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case QUESTION_DETAILS_SUCCESS:
      return { loading: false, question: action.payload };
    case QUESTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_DETAILS_RESET:
      return { question: {} };
    default:
      return state;
  }
};

export const questionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return { loading: true, ...state };
    case QUESTION_CREATE_SUCCESS:
      return { loading: false, question: action.payload, success: true };
    case QUESTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const questionUpdateReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_UPDATE_REQUEST:
      return { loading: true };
    case QUESTION_UPDATE_SUCCESS:
      return { loading: false, question: action.payload, success: true };
    case QUESTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_UPDATE_RESET:
      return { question: {} };
    default:
      return state;
  }
};

export const questionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return { loading: true };
    case QUESTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const answerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANSWER_CREATE_REQUEST:
      return { loading: true, ...state };
    case ANSWER_CREATE_SUCCESS:
      return { loading: false, question: action.payload, success: true };
    case ANSWER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ANSWER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const answerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ANSWER_DELETE_REQUEST:
      return { loading: true };
    case ANSWER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ANSWER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

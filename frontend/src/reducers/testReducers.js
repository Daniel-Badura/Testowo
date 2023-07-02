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
  TEST_CREATE_RESET,
  TEST_UPDATE_RESET,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
  TEST_TOP_RATED_REQUEST,
  TEST_TOP_RATED_SUCCESS,
  TEST_TOP_RATED_FAIL,
} from "../constants/testConstants.js";

export const testListReducer = (state = { tests: [] }, action) => {
  switch (action.type) {
    case TEST_LIST_REQUEST:
      return { loading: true, tests: [] };
    case TEST_LIST_SUCCESS:
      return {
        loading: false,
        tests: action.payload.tests,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case TEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testDetailsReducer = (
  state = { test: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case TEST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TEST_DETAILS_SUCCESS:
      return { loading: false, test: action.payload };
    case TEST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const testCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_CREATE_REQUEST:
      return { loading: true, ...state };
    case TEST_CREATE_SUCCESS:
      return { loading: false, test: action.payload, success: true };
    case TEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const testUpdateReducer = (state = { test: {} }, action) => {
  switch (action.type) {
    case TEST_UPDATE_REQUEST:
      return { loading: true };
    case TEST_UPDATE_SUCCESS:
      return { loading: false, test: action.payload, success: true };
    case TEST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TEST_UPDATE_RESET:
      return { test: {} };
    default:
      return state;
  }
};

export const testDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_DELETE_REQUEST:
      return { loading: true };
    case TEST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TEST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true };
    case REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true };
    case REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const testTopRatedReducer = (state = { tests: [] }, action) => {
  switch (action.type) {
    case TEST_TOP_RATED_REQUEST:
      return { loading: true, tests: [] };
    case TEST_TOP_RATED_SUCCESS:
      return { loading: false, success: true, tests: action.payload };
    case TEST_TOP_RATED_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const testFeaturedReducer = (state = { tests: [] }, action) => {
  switch (action.type) {
    case TEST_CREATE_REQUEST:
      return { loading: true, tests: [] };
    case TEST_CREATE_SUCCESS:
      return { loading: false, success: true, tests: action.payload };
    case TEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

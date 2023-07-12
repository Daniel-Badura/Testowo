import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userVerifyEmailReducer,
  usersListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  testListReducer,
  testDetailsReducer,
  testDeleteReducer,
  testUpdateReducer,
  testCreateReducer,
  reviewCreateReducer,
  testTopRatedReducer,
  testFeaturedReducer,
} from "./reducers/testReducers";
import {
  questionListReducer,
  questionDetailsReducer,
  questionDeleteReducer,
  questionUpdateReducer,
  questionCreateReducer,
  answerCreateReducer,
  answerDeleteReducer,
  testQuestionDetailsReducer,
} from "./reducers/questionReducers";

const middleware = [thunk];
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userVerifyEmail: userVerifyEmailReducer,
  usersList: usersListReducer,
  testList: testListReducer,
  testDetails: testDetailsReducer,
  testCreate: testCreateReducer,
  testUpdate: testUpdateReducer,
  testDelete: testDeleteReducer,
  testTopRated: testTopRatedReducer,
  testFeatured: testFeaturedReducer,
  reviewCreate: reviewCreateReducer,
  questionList: questionListReducer,
  questionDetails: questionDetailsReducer,
  questionCreate: questionCreateReducer,
  questionUpdate: questionUpdateReducer,
  questionDelete: questionDeleteReducer,
  answerCreate: answerCreateReducer,
  answerDelete: answerDeleteReducer,
  testQuestionDetails: testQuestionDetailsReducer,
});
// localStorage.removeItem('userInfo'); web;

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: middleware,
});

export default store;

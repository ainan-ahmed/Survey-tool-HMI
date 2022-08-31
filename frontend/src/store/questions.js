import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {

} from "./endpoints";
import { addError } from "./errors";

const slice = createSlice({
  name: "questions",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
  },
  reducers: {
    
    questionCreateRequested: (state, action) => {
      state.isLoading = true;
    },
    questionCreateSucceed: (state, action) => {
      state.isLoading = false;
    },
    questionCreateFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const {
  questionRequested,
  questionFailed,
  questionSucceed,

} = slice.actions;
export default slice.reducer;

//ACTIONs
//--------------------------------

//----------------------------------

export const getHeaders = (getState) => {
  const token = getState().auth.token;
  console.log("token " + token);
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = "Token " + token;
  }
  //console.log("config ->> "+ config)
  return config;
};
export const getFileHeaders = (getState) => {
  const token = getState().auth.token;
  //console.log("token " + token);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  if (token) {
    config.headers["Authorization"] = "Token " + token;
  }
  //console.log("config ->> "+ config)
  return config;
};
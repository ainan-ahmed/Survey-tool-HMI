import { createSlice } from "@reduxjs/toolkit";
import axios  from "axios";
import { answer_routes } from "./endpoints";
import { getFileHeaders, getHeaders } from "./users";

const slice = createSlice({
  name: "answers",
  initialState: {
    isLoading: false,
  },
  reducers: {
    answerCreateRequested: (state, action) => {
      state.isLoading = true;
    },
    answerCreateSucceed: (state, action) => {
      state.isLoading = false;
      state.answer = action.payload;
    },
    answerCreateFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const {
  answerCreateFailed,
  answerCreateSucceed,
  answerCreateRequested,
} = slice.actions;
export default slice.reducer;

export const createAnswer = data => async (dispatch, getState) => {
  console.log("answer create requested");
  dispatch({
    type: answerCreateRequested.type,
  });
  //console.log("token " + token);
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  //console.log("config ->> "+ config)
  
  try {
    console.log(data);
    const response = await axios.post(answer_routes,data,config);
    
    dispatch({  
      type: answerCreateSucceed.type,
      payload: response.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: answerCreateFailed.type,
    });
  }
};

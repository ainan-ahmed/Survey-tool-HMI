import { createSlice } from "@reduxjs/toolkit";
import axios  from "axios";
import { entry_routes } from "./endpoints";
import { getFileHeaders, getHeaders } from "./users";

const slice = createSlice({
  name: "entries",
  initialState: {
    isLoading: false,
    entry: null,
  },
  reducers: {
    entryCreateRequested: (state, action) => {
      state.isLoading = true;
    },
    entryCreateSucceed: (state, action) => {
      state.isLoading = false;
      state.entry = action.payload;
    },
    entryCreateFailed: (state, action) => {
      state.isLoading = false;
      state.entry = null;
    },
  },
});
export const {
  entryCreateFailed,
  entryCreateSucceed,
  entryCreateRequested,
} = slice.actions;
export default slice.reducer;

export const createEntry = data => async (dispatch, getState) => {
  console.log("entry create requested");
  dispatch({
    type: entryCreateRequested.type,
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
    const response = await axios.post(entry_routes,data,config);
    
    dispatch({  
      type: entryCreateSucceed.type,
      payload: response.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: entryCreateFailed.type,
    });
  }
};

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
survey_routes
} from "./endpoints";
import { addError } from "./errors";

const slice = createSlice({
  name: "surveys",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    survey: null,
  },
  reducers: {
    
    surveyCreateRequested: (state, action) => {
      state.isLoading = true;
    },
    surveyCreateSucceed: (state, action) => {
      state.isLoading = false;
      state.survey = action.payload;
    },
    surveyCreateFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const {
  surveyCreateRequested,
  surveyCreateSucceed,
  surveyCreateFailed,

} = slice.actions;
export default slice.reducer;

//ACTIONs
//--------------------------------
export const createSurvey = data => async (dispatch, getState) => {
  console.log("Survey create requested");
  dispatch({
    type: surveyCreateRequested.type,
  });

  
  try {
    console.log(data);
    const response = await axios.post(survey_routes,data,getHeaders(getState));
    
    dispatch({  
      type: surveyCreateSucceed.type,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: surveyCreateFailed.type,
    });
  }
};

//----------------------------------
export const getSurveys = () => async (dispatch, getState) => {
  console.log("Survey create requested");
  dispatch({
    type: surveyCreateRequested.type,
  });

  
  try {
    const response = await axios.get(survey_routes);
    
    dispatch({  
      type: surveyCreateSucceed.type,
      payload: response.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: surveyCreateFailed.type,
    });
  }
};

//----------------------------------
export const getSurvey = (survey_id) => async (dispatch, getState) => {
  console.log("Survey create requested");
  dispatch({
    type: surveyCreateRequested.type,
  });

  
  try {
    const response = await axios.get(survey_routes+survey_id+"/");
    console.log(response)
    dispatch({  
      type: surveyCreateSucceed.type,
      payload: response.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: surveyCreateFailed.type,
    });
  }
};

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
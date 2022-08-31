import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  loginEndpoint,
  get_auth_user,
  logout_user,
  registrationEndpoint,
} from "./endpoints";
import { addError } from "./errors";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const slice = createSlice({
  name: "users",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false,
    user: null,
  },
  reducers: {
    authRequested: (state, action) => {
      state.isLoading = true;
    },
    authSucceed: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
    loginRequested: (state, action) => {
      state.isLoading = true;
    },
    loginSucceed: (state, action) => {
      localStorage.setItem("token", action.payload.key);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.key;
    },
    loginFailed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
    logoutSucceed: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
    registerRequested: (state, action) => {
      state.isLoading = true;
    },
    registerSucceed: (state, action) => {
      localStorage.setItem("token", action.payload.key);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.key;
    },
    registerFailed: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.user = null;
    },
  },
});
export const {
  loginRequested,
  loginFailed,
  loginSucceed,
  authFailed,
  authRequested,
  authSucceed,
  logoutSucceed,
  registerRequested,
  registerFailed,
  registerSucceed,
} = slice.actions;
export default slice.reducer;

//ACTIONs
//--------------------------------
export const getAuthUserInfo = () => async (dispatch, getState) => {
  dispatch({
    type: authRequested.type,
  });
  console.log("head =>" + getHeaders(getState));
  try {
    // console.log("head =>")
    const response = await axios.get(get_auth_user, getHeaders(getState));
    //console.log("->> "+response.data);
    dispatch({
      type: authSucceed.type,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: authFailed.type,
    });
  }
};

//-----------------------------

export const login = (data) => async (dispatch, getState) => {
  dispatch({
    type: loginRequested.type,
  });
  try {
    console.log(data);
    const response = await axios.post(
      loginEndpoint,
      data,
     // getHeaders(getState)
    );
    // const headers = getHeaders(getState)
    // const response = await authAPI(loginEndpoint,'post',data,headers)
    console.log(response.data);
    dispatch({
      type: loginSucceed.type,
      payload: response.data,
    });

    dispatch(getAuthUserInfo());
  } catch (error) {
    console.log(error.response.data)
    dispatch(addError(error.response.data, error.response.status));
    dispatch({
      type: loginFailed.type,
    });
  }
};
//-------------------------------

export const logout = () => async (dispatch, getState) => {
  try {
    const response = await axios.post(logout_user, {});
    dispatch({
      type: logoutSucceed.type,
    });
  } catch (error) {
    dispatch(addError(error.response.data, error.response.status));
    console.log("logout error");
  }
};
//--------------------------------

// export const updateUser = (data) => async (dispatch, getState) => {
//   dispatch({
//     type: authRequested.type,
//   });
//   try {
//     const response = await axios.put(get_auth_user, data, getHeaders(getState));
//     dispatch({
//       type: authSucceed.type,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch(addError(error.response.data, error.response.status));
//     dispatch({
//       type: detailsFailed.type,
//     });
//   }
// };

//---------------------------------

export const register =
  (email, first_name, last_name, password1, password2, date_of_birth, gender) =>
  async (dispatch, getState) => {
    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      password1,
      password2,
      date_of_birth,
      gender,
    });
    console.log(body)
    dispatch({
      type: registerRequested.type,
    });
    try {
      const response = await axios.post(
        registrationEndpoint,
        body,
        getHeaders(getState)
      );
      dispatch({
        type: registerSucceed.type,
        payload: response.data,
      });
      dispatch(getAuthUserInfo());
    } catch (error) {
      dispatch(addError(error.response.data, error.response.status));
      console.log(error.response);
      dispatch({
        type: registerFailed.type,
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
  console.log(config)
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
export const getCsrfToken = () => {
  const csrf = document.cookie.match("(^|;)\\s*csrftoken\\s*=\\s*([^;]+)");
  return csrf ? csrf.pop() : "";
};

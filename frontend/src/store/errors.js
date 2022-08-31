import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "errors",
  initialState: {
    msg: {},
    status: null,
  },
  reducers: {
    errorsRecevied: (errors, action) => {
      errors.msg = action.payload.msg;
      errors.status = action.payload.status;
    },
  },
});

const { errorsRecevied } = slice.actions;
export default slice.reducer;

export const addError = (msg, status) => (dispatch) => {
  dispatch({
    type: errorsRecevied.type,
    payload: { msg, status },
  });
};
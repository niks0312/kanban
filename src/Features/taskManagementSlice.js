import { createSlice } from "@reduxjs/toolkit";

export const taskManagementSlice = createSlice({
  name: "taskManagement",
  initialState: { tasks: [], token: null, loginToken: null },
  reducers: {
    login: (state, action) => {
      const stateValue = state;
      stateValue.loginToken = action.payload;

      state = stateValue;
    },
    register: (state, action) => {
      const stateValue = state;
      stateValue.token = action.payload;

      state = stateValue;
    },
  },
});

export const { login, register } = taskManagementSlice.actions;

export default taskManagementSlice.reducer;

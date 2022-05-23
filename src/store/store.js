import { configureStore } from "@reduxjs/toolkit";
import taskManagementReducer from "../Features/taskManagementSlice";
const store = configureStore({
  reducer: {
    taskManagement: taskManagementReducer,
  },
});
export default store;

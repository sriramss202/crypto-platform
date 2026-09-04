import { configureStore } from "@reduxjs/toolkit";
import rewardsReducer from "./rewardsSlice";

export const store = configureStore({
  reducer: {
    rewards: rewardsReducer,
  },
});

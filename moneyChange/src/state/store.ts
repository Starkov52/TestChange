import { configureStore } from "@reduxjs/toolkit";
import userData from "./mainSlice";
const store = configureStore({
     reducer: {
          userData
     }
});
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;

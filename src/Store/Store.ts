import { configureStore } from "@reduxjs/toolkit";

import  userReducer  from "../Slice/userSlice";
import carDetailsReducer from "../Slice/carDetailSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        carDetails: carDetailsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

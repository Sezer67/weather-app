import { configureStore } from "@reduxjs/toolkit";
import weaterSlice from "./weather/weaterSlice";

const store = configureStore({
    reducer:{
        weather:weaterSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
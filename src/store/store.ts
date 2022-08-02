import {configureStore} from "@reduxjs/toolkit";
import newsSlice from "./newsSlice";
import commentSlice from "./commentSlice";

const store = configureStore({
    reducer: {
        news: newsSlice,
        comments: commentSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
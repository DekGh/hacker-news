import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INews} from "../models/INews";

interface NewsState {
    news: INews[];
    isLoading: boolean;
    error: string;
}

const initialState: NewsState = {
    news: [],
    isLoading: false,
    error: ''
}

export const getNews = createAsyncThunk(
    "news/getNews",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(" https://hacker-news.firebaseio.com/v0/newstories.json").then(res => res.json())
            const newsData = await Promise.all(res.slice(0, 100).map((id: number) => {return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())}))
            return newsData
        } catch (e) {
            return thunkAPI.rejectWithValue("News loading is failed")
        }
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getNews.fulfilled.type]: (state, action: PayloadAction<INews[]>) => {
            state.isLoading = false
            state.error = ""
            state.news = action.payload
        },
        [getNews.pending.type]: (state) => {
            state.isLoading = true

        },
        [getNews.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export default newsSlice.reducer
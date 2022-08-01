import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IComment} from "../models/INews";

interface CommentsState {
    comments: IComment[];
    isLoading: boolean;
    error: string;
}

const initialState: CommentsState = {
    comments: [],
    isLoading: false,
    error: ''
}

export const getComments = createAsyncThunk(
    "comments/getComments",
    async (id:number, thunkAPI) => {
        try {
            const res = await fetch(` https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
            if ("kids" in res) {
                res.kids = await Promise.all(res.kids.map((id: number) => {return fetch(` https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())}))
                return res
            } else {
                return res
            }
        } catch (e) {
            return thunkAPI.rejectWithValue("News loading is failed")
        }
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments: (state) => {
            state.comments.splice(0, state.comments.length)
        },
    },
    extraReducers: {
        [getComments.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
            state.isLoading = false
            state.error = ""
            state.comments.push(action.payload)
        },
        [getComments.pending.type]: (state) => {
            state.isLoading = true

        },
        [getComments.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {clearComments} = commentsSlice.actions
export default commentsSlice.reducer
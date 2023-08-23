import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/constants"

export const getCategories = createAsyncThunk(
    'categories/getCategories', 
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`${BASE_URL}/categories`)
            return res.data
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error)
        }
    }
)

const categoriesSlcie = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: builder => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.list = action.payload
            state.isLoading = false
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export default categoriesSlcie.reducer
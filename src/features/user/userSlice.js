import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import axios from "axios"
import { showSnackbar } from "../snackbar/snackbarSlice"

export const register = createAsyncThunk(
    'userSlcie/register', 
    async ({values, dispatch}, thunkApi) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, values)
            return res.data
        } catch (error) {
            console.log(error)
            dispatch(showSnackbar({
                message: "Invalid data ",
                options: {variant: 'error'}
            }))
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk(
    'userSlcie/login', 
    async ({values, dispatch}, thunkApi) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, values)
            const user = await axios.get(`${BASE_URL}/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${res.data.access_token}`
                }
            })
            return user.data
        } catch (error) {
            console.log(error)
            dispatch(showSnackbar({
                message: "Invalid login or password ",
                options: {variant: 'error'}
            }))
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const update = createAsyncThunk(
    'userSlcie/update', 
    async (payload, thunkApi) => {
        try {
            const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)
            return res.data
        } catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error)
        }
    }
)

const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        cart: [
            {
                id: 28,
                title: 'Regular Cargo Jogger Pants',
                price: 634,
                description: 'Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals',
                images: [
                  'https://dfcdn.defacto.com.tr/7/Z7995AZ_23SP_BK81_01_02.jpg'
                ],
                creationAt: '2023-08-22T21:28:34.000Z',
                updatedAt: '2023-08-22T21:29:23.000Z',
                category: {
                  id: 1,
                  name: 'Clothes',
                  image: 'https://picsum.photos/640/640?r=4717',
                  creationAt: '2023-08-22T21:28:34.000Z',
                  updatedAt: '2023-08-22T21:28:34.000Z'
                },
                quantity: 1
              }
        ],
        showForm: false,
        formType: "signup"
    },
    reducers: {
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart]
            const found = state.cart.find(({ id }) => id === payload.id)
            
            if(found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id 
                        ? {...item, quantity: payload.quantity || item.quantity + 1}
                        : item
                })
            } else newCart.push({ ...payload, quantity: 1 })

            state.cart = newCart
        },
        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => id !== payload);
        },
        toggleForm: (state, { payload }) => {
            state.showForm = payload
        },
        toggleFormtype: (state, { payload }) => {
            state.formType = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(register.fulfilled, addCurrentUser)
        builder.addCase(login.fulfilled, addCurrentUser)
        builder.addCase(update.fulfilled, addCurrentUser)
    }
})

export const { addItemToCart, toggleForm, toggleFormtype, removeItemFromCart } = userSlice.actions

export default userSlice.reducer
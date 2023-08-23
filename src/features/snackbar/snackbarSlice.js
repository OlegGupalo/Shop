import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
    message: '',
    options: {},
    },
    reducers: {
        showSnackbar: (state, action) => {
            state.message = action.payload.message;
            state.options = action.payload.options;
        },
        hideSnackbar: (state) => {
            state.message = '';
            state.options = {};
        },
    },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
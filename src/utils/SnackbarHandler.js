import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { hideSnackbar } from '../features/snackbar/snackbarSlice';

const SnackbarHandler = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { message, options } = useSelector((state) => state.snackbar);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (message) {
            enqueueSnackbar(message, {
                autoHideDuration: 3000, // Настройка продолжительности показа снэкбара
                onClose: () => dispatch(hideSnackbar()),
                ...options,
            });
        }
    }, [message, options, dispatch, enqueueSnackbar]);

    return null;
};

export const SnackbarWrapper = ({ children }) => (
    <SnackbarProvider>
        {children}
        <SnackbarHandler />
    </SnackbarProvider>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './features/store';
import { SnackbarWrapper } from './utils/SnackbarHandler';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <SnackbarWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarWrapper>
    </Provider>
);

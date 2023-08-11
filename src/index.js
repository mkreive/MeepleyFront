import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '../src/sass/main.scss';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

import '../src/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

reportWebVitals();

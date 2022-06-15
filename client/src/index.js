import React from 'react';
import App from './App';
import ReactDOM from "react-dom";
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Router} from 'react';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
  );
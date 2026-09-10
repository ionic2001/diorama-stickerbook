import React from 'react';
import ReactDOM from 'react-dom/client';
import ServiceApp from './ServiceApp';
import './styles.css';

const root = document.getElementById('root')!;
const app = <React.StrictMode><ServiceApp /></React.StrictMode>;
if (root.hasChildNodes() && !window.location.pathname.includes('/studio')) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);

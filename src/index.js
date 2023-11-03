import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Homepage from './views/homepage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Suspense>
    <Homepage />
  </React.Suspense>
);


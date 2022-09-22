import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Player
 from './player';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Suspense>
    <Player />
  </React.Suspense>
);


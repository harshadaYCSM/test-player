import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Player
 from './common/player';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Suspense>
    <Player />
  </React.Suspense>
);


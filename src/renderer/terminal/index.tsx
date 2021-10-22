import '../styles/fonts.css';
import '../styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Terminal } from './Terminal';

ReactDOM.render(
  <main className="h-screen">
    <Terminal />
  </main>, 
  document.getElementById('root')
);

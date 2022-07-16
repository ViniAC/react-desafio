import React from 'react';
import Routes from "./routes/index";
import { BrowserRouter } from 'react-router-dom';
import './global/styles.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;

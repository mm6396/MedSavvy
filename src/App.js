import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Layouts from './layouts/Layouts';

function App() {

  return (
    <div className="App">
      <Router>
        <Layouts />
      </Router>
    </div>
  );
}

export default App;

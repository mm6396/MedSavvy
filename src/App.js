import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Layouts from './layouts/Layouts';
import { ViewContextProvider } from './Contexts/ViewContext';

function App() {

  return (
    <ViewContextProvider>
      <div className="App">
        <Router>
          <Layouts />
        </Router>
      </div>
    </ViewContextProvider>
  );
}

export default App;

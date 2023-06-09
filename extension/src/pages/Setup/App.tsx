import React, { useEffect, useLayoutEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Main from './views/Main/Main';
import Configuration from './views/Configuration/Configuration';
import Experiment from './views/Experiment/Experiment';
import About from './views/About/About';

import "./style.module.scss"



const App = () => {
  

  useEffect(() => {
    const init = async () => {
      
      
    }
    
    init()
  }, [])


  return(
    <>
      <HashRouter>
        <Routes>
          <Route 
            path="/"
            element={<Main />}
          />
          <Route 
            path="/configuration"
            element={<Configuration />}
          />
          <Route 
            path="/experiment"
            element={<Experiment />}
          />
          <Route 
            path="/about"
            element={<About />}
          />
        </Routes>
      </HashRouter>
    </>
  )
};

export default App;
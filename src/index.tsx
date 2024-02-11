import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Study from './Study'
import Quiz from './Quiz'
import Home from './Home'

function App () {
  return (
        <div  className="container" style={{}}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="study" element={<Study/>} />
              <Route path="quiz" element={<Quiz/>} />
          </Routes>
        </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, rootElement);
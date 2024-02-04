import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import _ from 'lodash';
import {scale, center_left, center_right, title, unitType, geoUrl} from './Config.tsx';
import { useQuiz, QuizProvider } from './QuizContext';

function TextBox() {
  const { quiz, quizIndex, message } = useQuiz(); // Use context to access state and functions

  let nameToGuess = null;
  if (quiz && quizIndex < quiz.length) { // Ensure quiz is defined and quizIndex is within bounds
    nameToGuess = quiz[quizIndex].unitName;
  }

  return (
    <div>
      <div className="card" style={{marginTop: 40}}>
        <div className="card-body">
          <h2>{message}</h2>
        </div>
      </div>
      <div className="card" style={{marginTop: 10}}>
        <div className="card-body">
          <h3>{nameToGuess}</h3>
        </div>
      </div>
    </div>
  );
}

function Unit({ geography }) {
  const { done, handleUnitClick, quiz, quizIndex } = useQuiz();
  const unitName = geography?.properties?.[unitType];
  let unitDone = done.includes(unitName);
  const isCurrentQuizUnit = quizIndex < quiz.length && unitName === quiz[quizIndex].unitName;

  return (
      <Geography
          geography={geography}
          style={{
              default: {
                  fill: unitDone ? 'green' : 'grey', // Units that have been identified are green
                  outline: 'none',
              },
              hover: {
                  fill: '#3C3B6E', // Highlight color on hover
                  outline: 'none',
              },
              pressed: {
                  outline: 'none',
                  fill: isCurrentQuizUnit ? 'green' : 'red', // Correct current unit turns green, incorrect turns red
              },
          }}
          onClick={() => handleUnitClick(geography)}
      />
  );
}


function Map() {
  const { quiz, quizIndex, message, restartQuiz } = useQuiz(); // Use context to access state and functions

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand justify-content-end" href="/" style={{color: 'black', marginLeft: 15}}><h2>{title}</h2></a>
        <div>
          <a type="button" className="btn btn-success" href="study" style={{margin: 5}}>Study</a>
          <a type="button" className="btn btn-success" href="quiz" style={{margin: 5}}>Quiz</a>
        </div>
      </nav>

      <div className="row">
        <div className="col-md-4">
          <TextBox /> {/* TextBox now uses context internally for its props */}
          <button className="btn btn-success" style={{margin: 10}} onClick={restartQuiz}>Restart</button>
        </div>
        <div className="col-md-8">
          <div className="card" style={{marginTop: 40}}>
            <div className="card-body">
              <ComposableMap
                projectionConfig={{
                  scale: scale,
                  center: [center_left, center_right]
                }}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) => 
                  geographies.map(geo => (
                    <Unit 
                      key={geo?.rsmKey} 
                      geography={geo}
                    /> // Unit now uses context internally for its props
                  ))}
                </Geographies>
              </ComposableMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Quiz() {
  return (
      <QuizProvider>
        <Map />
      </QuizProvider>
  )
}

export default Quiz;
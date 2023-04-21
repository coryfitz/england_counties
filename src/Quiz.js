import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import _ from 'lodash';
import {scale, center_left, center_right, title, unitType, unitNamesPath, geoUrl} from './Config';

//const unitNamesJson = import('./data/provinceNames.json');
import unitNamesJson from './data/englandCountyNames.json';
const allUnits = unitNamesJson;

function Map() {
  const [quiz, setQuiz] = useState(getNewShuffledQuiz());
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [done, setDone] = useState([]);
  const [message, setMessage] = useState('Please select:');

  const handleUnitClick = (unitGeo) => {

    // if quiz is over don't do anything:
    if (quizEnded) return;

    const unitName = unitGeo?.properties?.[unitType];
    if (!unitName) return;

    if (unitName === quiz[quizIndex].unitName) {
        setDone(done => [...done, unitName]);
        moveToNextUnit(unitName, true, false);
    }
}

  function restartQuiz() {
    setQuiz(getNewShuffledQuiz());
    setQuizIndex(0);
    setQuizEnded(false);
    setDone([]);
    setMessage('Please select:');
  }

  const moveToNextUnit = (unitName) => {
    // update the quiz:
    setQuiz([...quiz.slice(0, quizIndex), {
        unitName,
    },
    ...quiz.slice(quizIndex + 1)
    ]);

    // move to the next unit:
    setQuizIndex(quizIndex + 1);

    // check if the quiz has ended:
    if (quizIndex + 1 === quiz.length) {
        setQuizEnded(true);
    }
  }

  const unitsPropertiesMap = {};

  _.forEach(quiz, unit => {
    unitsPropertiesMap[unit.unitName] = {
    }
  });

  useEffect(() => {
    if (done.length === (Object.keys(unitNamesJson)).length) {
    setMessage('Congratulations on completing the quiz');
  }
  }, [done])

  
  return (
    <div className="container">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand justify-content-end" href="/" style={{color: 'black'}}><h2>{title}</h2></a>
        <a type="button" className="btn btn-success" href="study" style={{margin: 5}}>Study</a>
        <a type="button" className="btn btn-success" href="quiz" style={{margin: 5}}>Quiz</a>
      </nav>

      <div style={{display: 'flex'}}>

        <div style={{width: '40%', marginRight: 10}}>
          <TextBox quiz={quiz} quizIndex={quizIndex} message={message}/>
          <button className="btn btn-success" style={{margin: 10}} onClick={restartQuiz}>Restart</button>
        </div>

        <div className="card" style={{ width: '100%', marginLeft: 10, marginTop: 40}}>
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
                    currQuizUnit={((quizIndex < quiz.length) && quiz[quizIndex].unitName) || ''}
                    handleUnitClick={handleUnitClick}
                    done={done}
                    unitType={unitType}
                  />
                ))}
              </Geographies>
            </ComposableMap>
          </div>
        </div>

      </div>


    </div>
  )
}

function getNewShuffledQuiz() {
  return _.map(
      _.shuffle(Object.keys(unitNamesJson)), unitName => ({
          unitName,
      })
  );
}

function TextBox ({quiz, quizIndex, restartQuiz, message}) {

  let nameToGuess = null;

  try {
    nameToGuess = quiz[quizIndex].unitName;
  }
  catch(err) {
    nameToGuess = null;
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
  )
}

function Unit({geography, currQuizUnit, handleUnitClick, done, unitType}) {
  const unitName = geography?.properties?.[unitType];
  const currUnit = allUnits[unitName];
  if (!currUnit) { return (<></>); }
  let unitDone = false;

  if (done.includes(unitName)) {
    unitDone= true;
  };

  return (
    <Geography 
    geography={geography}
    style={{
      default: {
        fill: unitDone ? 'green' : 'grey',
        outline: 'none',
      },
      hover: {
          fill: '#3C3B6E',
          outline: 'none',
      },
      pressed: {
        outline: 'none',
        fill: unitName === currQuizUnit ? 'green' : 'red'
    }
    }}
    onClick={() => handleUnitClick(geography)}
    />
    )
}

function Quiz() {
    return (
        <div>
        <Map />
        </div>
    )
}

export default Quiz;
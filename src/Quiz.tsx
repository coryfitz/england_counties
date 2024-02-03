import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, GeographyProps } from "react-simple-maps";
import _ from 'lodash';
import { scale, center_left, center_right, title, unitType, geoUrl } from './Config.tsx';
const unitNamesJson = require('./data/englandCountyNames.json');

interface UnitDetails {
  val: number;
}

interface UnitNames {
  [key: string]: UnitDetails;
}

interface QuizItem {
  unitName: string;
}

const allUnits: UnitNames = unitNamesJson;

function getNewShuffledQuiz(): QuizItem[]  {
  return _.map(_.shuffle(Object.keys(unitNamesJson)), function(unitName: string) {
    return { unitName };
  });
}

interface TextBoxProps {
  quiz: QuizItem[];
  quizIndex: number;
  message: string;
}
function TextBox (props: TextBoxProps) {

  const {quiz, quizIndex, message} = props

  const nameToGuess = quizIndex < quiz.length ? quiz[quizIndex].unitName : null;

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

interface UnitProps {
  geography: GeographyProps["geography"];
  currQuizUnit: string;
  handleUnitClick: (unitGeo: GeographyProps["geography"]) => void;
  done: string[];
  unitType: string;
  quiz: QuizItem[];
  quizIndex: number;
  quizEnded: boolean;
  setDone: React.Dispatch<React.SetStateAction<string[]>>;
  moveToNextUnit: () => void;
  setQuiz: React.Dispatch<React.SetStateAction<QuizItem[]>>;
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  setQuizEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

function Unit(props: UnitProps) {
  const {geography, currQuizUnit, handleUnitClick, done, unitType, quiz, quizIndex, quizEnded, setDone, moveToNextUnit, setQuiz, setQuizIndex, setQuizEnded} = props;
  const unitName = geography?.properties?.[unitType];
  const currUnit = allUnits[unitName];
  if (!currUnit) { return (<></>); }
  let unitDone = false;

  if (done.includes(unitName)) {
    unitDone = true;
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
      onClick={() => handleUnitClick(geography, quiz, quizIndex, quizEnded, setDone, moveToNextUnit, setQuiz, setQuizIndex, setQuizEnded)}
    />
  )
}

function handleUnitClick(
  unitGeo: GeographyProps["geography"],
  quiz: QuizItem[],
  quizIndex: number,
  quizEnded: boolean,
  setDone: React.Dispatch<React.SetStateAction<string[]>>,
  moveToNextUnit: (unitName: string, quiz: QuizItem[], setQuiz: React.Dispatch<React.SetStateAction<QuizItem[]>>, setQuizIndex: React.Dispatch<React.SetStateAction<number>>, quizIndex: number, setQuizEnded: React.Dispatch<React.SetStateAction<boolean>>) => void,
  setQuiz: React.Dispatch<React.SetStateAction<QuizItem[]>>,
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>,
  setQuizEnded: React.Dispatch<React.SetStateAction<boolean>>
) {
  
  if (quizEnded) return;

  const unitName = unitGeo?.properties?.[unitType];

  if (!unitName) return;

  if (unitName === quiz[quizIndex].unitName) {
    console.log('success')
    setDone(function(done) {
      return [...done, unitName];
  });
      moveToNextUnit(unitName, quiz, setQuiz, setQuizIndex, quizIndex, setQuizEnded);
  }
}

function RenderGeographies(
  geographies: Geography[],
  done: string[],
  quiz: QuizItem[],
  quizIndex: number,
  quizEnded: boolean,
  setDone: React.Dispatch<React.SetStateAction<string[]>>,
  moveToNextUnit: () => void,
  setQuiz: React.Dispatch<React.SetStateAction<QuizItem[]>>,
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>,
  setQuizEnded: React.Dispatch<React.SetStateAction<boolean>>,
  handleUnitClick: (unitGeo: GeographyProps["geography"]) => void,
): React.ReactNode {
  return (
    <>
      {geographies.map(function(geo) {
    return (
      <Unit 
        key={geo?.rsmKey} 
        geography={geo}
        currQuizUnit={((quizIndex < quiz.length) && quiz[quizIndex].unitName) || ''}
        handleUnitClick={handleUnitClick}
        done={done}
        unitType={unitType}
        quiz={quiz}
        quizIndex={quizIndex}
        quizEnded={quizEnded}
        setDone={setDone}
        moveToNextUnit={moveToNextUnit}
        setQuiz={setQuiz}
        setQuizIndex={setQuizIndex}
        setQuizEnded={setQuizEnded}
        />
        );
      })}
    </>
  );
};

function restartQuiz(
  setQuiz: React.Dispatch<React.SetStateAction<QuizItem[]>>,
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>,
  setQuizEnded: React.Dispatch<React.SetStateAction<boolean>>,
  setDone: React.Dispatch<React.SetStateAction<string[]>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
  ) {
  setQuiz(getNewShuffledQuiz());
  setQuizIndex(0);
  setQuizEnded(false);
  setDone([]);
  setMessage('Please select:');
}

function moveToNextUnit(
  unitName: string,
  quiz: QuizItem[],
  setQuiz: React.Dispatch<React.SetStateAction<QuizItem[]>>,
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>,
  quizIndex: number,
  setQuizEnded: React.Dispatch<React.SetStateAction<boolean>>
  ) {
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

function effectFunction(done: string[], setMessage: React.Dispatch<React.SetStateAction<string>>) {
  if (done.length === Object.keys(unitNamesJson).length) {
    setMessage('Congratulations on completing the quiz');
  }
}

function GeographyRenderer({ geographies, done, quiz, quizIndex, quizEnded, setDone, moveToNextUnit, setQuiz, setQuizIndex, setQuizEnded, handleUnitClick }) {
  return RenderGeographies(geographies, done, quiz, quizIndex, quizEnded, setDone, moveToNextUnit, setQuiz, setQuizIndex, setQuizEnded, handleUnitClick);
}

function Quiz() {
  const [quiz, setQuiz] = useState(getNewShuffledQuiz());
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [done, setDone] = useState([]);
  const [message, setMessage] = useState('Please select:');
  //const geographies = GeographyProps["geography"]

  useEffect(() => {effectFunction(done, setMessage)}, [done]);

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
          <TextBox quiz={quiz} quizIndex={quizIndex} message={message}/>
          <button className="btn btn-success" style={{margin: 10}} onClick={() => restartQuiz(setQuiz, setQuizIndex, setQuizEnded, setDone, setMessage)}>Restart</button>
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
                {({ geographies }) => (
                    <GeographyRenderer
                      geographies={geographies}
                      done={done}
                      quiz={quiz}
                      quizIndex={quizIndex}
                      quizEnded={quizEnded}
                      setDone={setDone}
                      moveToNextUnit={moveToNextUnit}
                      setQuiz={setQuiz}
                      setQuizIndex={setQuizIndex}
                      setQuizEnded={setQuizEnded}
                      handleUnitClick={handleUnitClick}
                    />
                  )}
                </Geographies>
              </ComposableMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz;
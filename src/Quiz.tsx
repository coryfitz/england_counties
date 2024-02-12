import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {scale, center_left, center_right, unitType, geoUrl} from './Config';
import { useQuiz, QuizProvider } from './QuizContext';
import HeadBar from './HeadBar';

function TextBox() {
  const { quiz, quizIndex, message } = useQuiz();
  let nameToGuess = null;
  if (quiz && quizIndex < quiz.length) {
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

function Unit({ geography }: {geography: any}) {
  const { done, handleUnitClick, quiz, quizIndex } = useQuiz();
  const unitName = geography?.properties?.[unitType];
  let unitDone = done.includes(unitName);
  const isCurrentQuizUnit = quizIndex < quiz.length && unitName === quiz[quizIndex].unitName;

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
                  fill: isCurrentQuizUnit ? 'green' : 'red',
              },
          }}
          onClick={() => handleUnitClick(geography)}
      />
  );
}


function Map() {
  const { restartQuiz } = useQuiz();

  return (
    <div className="container">
      <HeadBar />

      <div className="row">
        <div className="col-md-4">
          <TextBox />
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
                    />
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
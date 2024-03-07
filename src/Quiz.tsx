import React from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scale, center_left, center_right, unitType, geoUrl } from './Config';
import { useQuiz, QuizProvider } from './QuizContext';
import HeadBar from './HeadBar'; // Ensure HeadBar is compatible with Material-UI
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

function TextBox() {
  const { quiz, quizIndex, message } = useQuiz();
  let nameToGuess = null;
  if (quiz && quizIndex < quiz.length) {
    nameToGuess = quiz[quizIndex].unitName;
  }

  return (
    <React.Fragment>
      <Card sx={{ marginTop: 5 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {message}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h6" component="h3">
            {nameToGuess}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

function Unit({ geography }: any) {
  const { done, handleUnitClick, quiz, quizIndex } = useQuiz();
  const unitName = geography?.properties?.[unitType];
  const unitDone = done.includes(unitName);
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
    <Container>
      <HeadBar />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextBox />
          <Button variant="contained" color="primary" onClick={restartQuiz} sx={{ marginTop: 2 }}>
            Restart
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ marginTop: 5 }}>
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

function Quiz() {
  return (
    <QuizProvider>
      <Map />
    </QuizProvider>
  );
}

export default Quiz;

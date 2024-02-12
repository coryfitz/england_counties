import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scale, center_left, center_right, unitType, geoUrl } from './Config';
import { useStudy, StudyProvider } from './StudyContext';
import HeadBar from './HeadBar';
import { Box, Card, CardContent, Typography, Container, Grid } from '@mui/material';

function TextBox() {
  const { selectedUnit, message } = useStudy(); // Use context
  const unitTypeUpper = unitType[0].toUpperCase() + unitType.slice(1);

  return (
    <Box>
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <Typography variant="h5">{message}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ mt: 1 }}>
        <CardContent>
          <Typography variant="h6">{unitTypeUpper}: {selectedUnit}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

function Unit({ geography }: {geography: any}) {
  const { handleUnitClick, handleMouseLeave } = useStudy(); // Use context

  return (
      <Geography
          geography={geography}
          style={{
              default: {
                  fill: 'grey',
                  outline: 'none',
              },
              hover: {
                  fill: '#3C3B6E',
                  outline: 'none',
              },
              pressed: {
                  outline: 'none',
              },
          }}
          onMouseEnter={() => handleUnitClick(geography)}
          onMouseLeave={handleMouseLeave}
      />
  );
}

function Study() {
  return (
    <StudyProvider>
      <Container>
        <HeadBar />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextBox />
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ mt: 5 }}>
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
    </StudyProvider>
  )
}

export default Study;

import React from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scale, center_left, center_right, title, unitType, geoUrl } from './Config';
import { useStudy, StudyProvider } from './StudyContext';

function TextBox() {
  const { selectedUnit, message } = useStudy(); // Use context
  const unitTypeUpper = unitType[0].toUpperCase() + unitType.slice(1);

  return (
    <div>
      <div className="card" style={{marginTop: 40}}>
        <div className="card-body">
          <h2>{message}</h2>
        </div>
      </div>
      <div className="card" style={{marginTop: 10}}>
        <div className="card-body">
          <h3>{unitTypeUpper}: {selectedUnit}</h3>
        </div>
      </div>
    </div>
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
            <TextBox />
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
    </StudyProvider>
  )
}

export default Study;
import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import _ from 'lodash';
import {scale, center_left, center_right, title, unitType, unitNamesPath, geoUrl} from './Config';
import unitNamesJson from './data/englandCountyNames.json'
const allUnits = unitNamesJson;

function Map() {
  const [done, setDone] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [message, setMessage] = useState(`Please select any ${unitType} to reveal its name`);

  const handleUnitClick = (unitGeo) => {
    const unitName = unitGeo?.properties?.[unitType];
    setSelectedUnit(unitName);
    if (done.includes(unitName) === false) {
        setDone(done => [...done, unitName]);
      };
}

  function restartQuiz() {
    setSelectedUnit(null);
    setMessage(`Please select any ${unitType} to reveal its name`);
    setDone([]);
  }

  const unitsPropertiesMap = {};

  _.forEach( unit => {
    unitsPropertiesMap[unit.unitName] = {
    }
  });

    useEffect(() => {
      if (done.length === (Object.keys(unitNamesJson)).length) {
      setMessage(`Congratulations on studying each ${unitType}`);
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

      <TextBox selectedUnit={selectedUnit} message={message}/>
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

function TextBox ({selectedUnit, message}) {
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
  )
}

function Unit({geography, handleUnitClick, done, unitType}) {
  const unitName = geography?.properties?.[unitType]
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
    }
    }}
    onClick={() => handleUnitClick(geography)}
    />
    )
}

function Study() {
    return (
        <div>
        <Map />
        </div>
    )
}

export default Study;
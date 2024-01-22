import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, GeographyProps } from "react-simple-maps";
import {scale, center_left, center_right, title, unitType, geoUrl} from './Config.tsx';

const unitNamesJson = require('./data/englandCountyNames.json');

interface UnitDetails {
  val: number;
}

interface UnitNames {
  [key: string]: UnitDetails;
}

const allUnits: UnitNames = unitNamesJson;

interface TextBoxProps {
  selectedUnit: string | null;
  message: string;
}

function TextBox(props: TextBoxProps) {
  const { selectedUnit, message } = props;
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

interface UnitProps {
  geography: GeographyProps["geography"];
  handleUnitClick: (unitGeo: GeographyProps["geography"], setSelectedUnit: React.Dispatch<React.SetStateAction<string | null>>) => void;
  handleMouseLeave: (setSelectedUnit: React.Dispatch<React.SetStateAction<string | null>>) => void;
  unitType: string;
  setSelectedUnit: React.Dispatch<React.SetStateAction<string | null>>;
}

function Unit(props: UnitProps) {
  const { geography, handleUnitClick, handleMouseLeave, setSelectedUnit } = props
  const unitName = geography?.properties?.[unitType] as string
  const currUnit = allUnits[unitName];
  if (!currUnit) { return (<></>); }

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
    }
    }}
    onMouseEnter={() => handleUnitClick(geography, setSelectedUnit)}
    onMouseLeave={() => handleMouseLeave(setSelectedUnit)}
    />
    )
}

function handleUnitClick(unitGeo: GeographyProps["geography"], setSelectedUnit: React.Dispatch<React.SetStateAction<string | null>>) {
  const unitName = unitGeo?.properties?.[unitType];
  setSelectedUnit(unitName);
}

function handleMouseLeave(setSelectedUnit: React.Dispatch<React.SetStateAction<string | null>>) {
  setSelectedUnit(null);
}

function renderGeographies(geographies: GeographyProps["geography"][], setSelectedUnit: React.Dispatch<React.SetStateAction<string | null>>) {
  return geographies.map(function(geo) {
    return (
      <Unit 
        key={geo?.rsmKey} 
        geography={geo}
        handleUnitClick={handleUnitClick}
        handleMouseLeave={handleMouseLeave}
        unitType={unitType}
        setSelectedUnit={setSelectedUnit}
      />
    );
  });
}

function Study() {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const message = `Please select any ${unitType} to reveal its name`;

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
          <TextBox selectedUnit={selectedUnit} message={message}/>
        </div>
        <div className="col-md-8">
          <div className="card" style={{ marginTop: 40}}>
              <div className="card-body">
                <ComposableMap
                  projectionConfig={{
                    scale: scale,
                    center: [center_left, center_right]
                  }}>
                  <Geographies geography={geoUrl}>
                    {function(geographyProps) {
                      return renderGeographies(geographyProps.geographies, setSelectedUnit);
                    }}
                  </Geographies>
                </ComposableMap>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Study;
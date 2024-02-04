import React, { createContext, useContext, useState } from 'react';
import {unitType} from './Config.tsx';

const StudyContext = createContext();

export const useStudy = () => useContext(StudyContext);

export const StudyProvider = ({ children }) => {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const message = `Please select any ${unitType} to reveal its name`;

    const handleUnitClick = (unitGeo) => {
        const unitName = unitGeo?.properties?.[unitType];
        setSelectedUnit(unitName);
    };

    const handleMouseLeave = () => {
        setSelectedUnit(null);
    };

    return (
        <StudyContext.Provider value={{ selectedUnit, message, handleUnitClick, handleMouseLeave }}>
            {children}
        </StudyContext.Provider>
    );
};
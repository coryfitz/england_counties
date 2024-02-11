import React, { createContext, useContext, useState, useEffect } from 'react';
import unitNamesJson from './data/englandCountyNames.json';
import _ from 'lodash';
import { unitType } from './Config';

interface QuizContextType {
    quiz: any[];
    quizIndex: number;
    quizEnded: boolean;
    done: string[];
    message: string;
    handleUnitClick: (unitGeo: any) => void;
    restartQuiz: () => void;
}

const defaultContextValue: QuizContextType = {
    quiz: [],
    quizIndex: 0,
    quizEnded: false,
    done: [],
    message: 'Please select:',
    handleUnitClick: () => {},
    restartQuiz: () => {},
};

const QuizContext = createContext<QuizContextType>(defaultContextValue);

export const useQuiz = () => useContext(QuizContext);

function getNewShuffledQuiz() {
    return _.map(
        _.shuffle(Object.keys(unitNamesJson)), unitName => ({
            unitName,
        })
    );
}

export const QuizProvider = ({ children }) => {
    const [quiz, setQuiz] = useState(getNewShuffledQuiz());
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);
    const [done, setDone] = useState<string[]>([]);
    const [message, setMessage] = useState('Please select:');

    useEffect(() => {
        if (done.length === Object.keys(unitNamesJson).length) {
            setMessage('Congratulations on completing the quiz');
        }
    }, [done]);

    const handleUnitClick = (unitGeo) => {
        if (quizEnded) return;
        const unitName = unitGeo?.properties?.[unitType];
        if (!unitName) return;
        if (unitName === quiz[quizIndex].unitName) {
            setDone(done => [...done, unitName]);
            moveToNextUnit(unitName);
        }
    };

    const moveToNextUnit = (unitName) => {
        setQuiz([...quiz.slice(0, quizIndex), { unitName }, ...quiz.slice(quizIndex + 1)]);
        const newIndex = quizIndex + 1;
        setQuizIndex(newIndex);
        if (newIndex === quiz.length) {
            setQuizEnded(true);
        }
    };

    const restartQuiz = () => {
        setQuiz(getNewShuffledQuiz());
        setQuizIndex(0);
        setQuizEnded(false);
        setDone([]);
        setMessage('Please select:');
    };

    return (
        <QuizContext.Provider value={{ quiz, quizIndex, quizEnded, done, message, handleUnitClick, restartQuiz }}>
            {children}
        </QuizContext.Provider>
    );
};

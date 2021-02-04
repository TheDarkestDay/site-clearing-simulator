import { Card, Button } from '@material-ui/core'
import React from 'react';
import { useDispatch } from 'react-redux';
import { startSimulation } from '../store-slice';

const dummyMap = [
  ["o", "o", "t", "o", "o", "o", "o", "o", "o", "o"],
  ["o", "o", "o", "o", "o", "o", "o", "T", "o", "o"],
  ["r", "r", "r", "o", "o", "o", "t", "T", "o", "o"],
  ["r", "r", "r", "r", "o", "o", "o", "o", "o", "o"],
  ["r", "r", "r", "r", "r", "t", "o", "o", "o", "o"]
];

export const SimulationFileInput = () => {
  const dispatch = useDispatch();

  const handleStartButtonClick = () => {
    dispatch(startSimulation(dummyMap));
  };

  return (
    <Card>
      <Button onClick={handleStartButtonClick}>
        Start simulation
      </Button>
    </Card>
  );
};
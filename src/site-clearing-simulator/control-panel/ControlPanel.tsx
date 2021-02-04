import { Button, Card } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { moveForward, rotateRight, rotateLeft } from '../store-slice';

export const ControlPanel = () => {
  const dispatch = useDispatch();

  const handleMoveForwardClick = () => {
    dispatch(moveForward());
  };

  const handleRotateLeftClick = () => {
    dispatch(rotateLeft());
  };

  const handleRotateRightClick = () => {
    dispatch(rotateRight());
  };

  return (
    <Card>
      <Button variant="contained" onClick={handleRotateLeftClick}>
        Rotate left
      </Button>

      <Button variant="contained" onClick={handleMoveForwardClick}>
        Move forward
      </Button>

      <Button variant="contained" onClick={handleRotateRightClick}>
        Rotate right
      </Button>
    </Card>
  );
};
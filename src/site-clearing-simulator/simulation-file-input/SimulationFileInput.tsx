import { Card, Typography, CardContent } from '@material-ui/core'
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { startSimulation } from '../store/store-slice';
import styles from './styles.module.css';

export const SimulationFileInput = () => {
  const dispatch = useDispatch();
  const fileFieldRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async () => {
    const fileField = fileFieldRef.current;
    if (fileField === null) {
      return;
    }

    const uploadedFiles = fileField.files;
    if (uploadedFiles != null) {
      const mapFile = uploadedFiles[0];
      const textContent = await mapFile.text();

      const siteRows = textContent.split('\n');
      const siteMap = [
        ...siteRows.map((row) => row.split(''))
      ];

      dispatch(startSimulation(siteMap));
    }
  };

  return (
    <Card>
      <CardContent>
        <form>
          <Typography className={styles.fileFieldLabel} component="label" htmlFor="simulationFile" gutterBottom>
            Please, provide a file to start simulation:
          </Typography>

          <input ref={fileFieldRef} id="simulationFile" type="file" accept="text/plain" onChange={handleFileUpload}/>
        </form>
      </CardContent>
    </Card>
  );
};
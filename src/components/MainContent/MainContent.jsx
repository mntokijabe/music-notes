import React from 'react';
import { Paper, Typography } from '@mui/material';

function MainContent() {
  return (
    <Paper style={{ flex: 1, padding: 16 }}>
      <Typography variant="h4">Main Content Area</Typography>
      <Typography variant="body1">
        This is where the main content will go.
      </Typography>
    </Paper>
  );
}

export default MainContent;

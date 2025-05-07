import { Box, Container } from '@mui/material';
import React from 'react';

function CardsPanel({ children }) {
  return (
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main
        }}
        fixed
        disableGutters
        style={{
          // width: '100%',
          minHeight: '100vh',
          // margin: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 25,
          padding: 25
        }}
        >
          { children }
      </Box>
    );
}

export default CardsPanel;

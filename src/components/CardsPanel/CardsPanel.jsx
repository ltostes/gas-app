import { Box, Container } from '@mui/material';
import React from 'react';

function CardsPanel({ children }) {
  return (
    <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 3,
          '& > *:not(:last-child)': {  // This replaces the 'gap' option to make the collapsible animation work
              mb: 3 // Theme spacing value (16px if default)
            }
          }}
        >
          { children }
      </Box>
    );
}

export default CardsPanel;

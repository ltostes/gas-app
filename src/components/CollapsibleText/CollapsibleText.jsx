import React from 'react';

import { Box, Typography, IconButton, Collapse, Stack } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import useToggle from '../../hooks/use-toggle';

function CollapsibleText({label, defaultOpen=false,children}) {
  const [open, toggleOpen] = useToggle(defaultOpen)

  return (
    <>
      <Stack>
        <Box
          sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems: 'center'
          }}
        >
            <Typography>
              {label}
            </Typography>
            <IconButton
              onClick={toggleOpen}
            >
              <ExpandMore />
            </IconButton>
        </Box>
        <Collapse
          in={open}
          unmountOnExit
        >
          {children}
        </Collapse>
      </Stack>
  </>
  );
}

export default CollapsibleText;

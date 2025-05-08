import React from 'react';

import { Tooltip, IconButton } from '@mui/material';
import { LocalGasStation } from '@mui/icons-material';

function GasAppLogo({...delegated}) {

  const tooltipMessage = `Este é um app para registrar, monitorar e aprender com os seus próprios abastecimentos de gasolina :)`
  return (
    <Tooltip title={tooltipMessage}>
      <IconButton
        color='secondary'
        {...delegated}
        sx={{
          ...(delegated.sx || {}),
          backgroundColor: (theme) => theme.palette.primary.main
        }}
      >
        <LocalGasStation />
      </IconButton>
    </Tooltip>

  )
}

export default GasAppLogo;

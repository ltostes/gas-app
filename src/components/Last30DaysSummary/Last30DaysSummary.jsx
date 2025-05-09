import React from 'react';
import * as d3 from 'd3';

import { Paper, Box, Typography, Chip, Tooltip } from '@mui/material';

import { MetricsContext } from '../MetricsProvider';

function Last30DaysSummary() {
  const { periodMetrics } = React.useContext(MetricsContext);

  const { last30Days, last60to30Days } = periodMetrics;

  const costFormat = (d) => `R$ ${d3.format('.2f')(d)}`;
  const percFormat = (d) => `${d3.format('+.1f')(d*100)}%`

  const costIncrease_abs = last30Days.total_cost - last60to30Days.total_cost;
  const costIncrease_per = (last30Days.total_cost - last60to30Days.total_cost) / last60to30Days.total_cost;


  return (
    <Paper 
    elevation={8}
    sx={{
      bgcolor: '#fff9cb' //(theme) => theme.palette.success.light
    }}
    >
    <Box
      padding={3}
      >
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>Últimos 30 dias</Typography>
      
      <Tooltip title={`${costFormat(last30Days.total_cost)} foram gastos, contra ${costFormat(last60to30Days.total_cost)} dos 30 dias anteriores.`}>
        <Box
          display='flex'
          alignItems='baseline'
          gap={1}
        >
          <Typography variant='body2' marginTop={1}>
          <strong>Gastos: </strong>
          </Typography>
          <Chip 
            color={costIncrease_per > 0.02 ? 'error' : 'success'}
            label={percFormat(costIncrease_per)}
            />
        </Box>
      </Tooltip>
    </Box>
  </Paper>
  );
}

export default Last30DaysSummary;

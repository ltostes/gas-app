import React from 'react';
import Card from '../Card';
import { Typography, CardContent, Card as MUICard, CardHeader, IconButton } from '@mui/material';

import * as d3 from "d3";

function RegisterCard({data}) {

  const {
    date,
    station,
    gasType,
    cost,
    liters,
    kilometers
  } = data;

  const formattedDate = d3.timeFormat('%Y-%m-%d')(date);

  return (
    <MUICard sx={{minWidth: 250, minHeight: 190}}>
      <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        {formattedDate}
      </Typography>
      <Typography variant="h5" component="div">
        {station}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{gasType}</Typography>
        <Typography variant="body2">
          {"R$ "+d3.format(".2f")(cost)}
          <br />
          {d3.format(".1f")(liters) + " Litros"}
          <br />
          {d3.format(",.0f")(kilometers) + " Km"}
          <br />
        </Typography>
      </CardContent>
    </MUICard>
  )
}

export default RegisterCard;

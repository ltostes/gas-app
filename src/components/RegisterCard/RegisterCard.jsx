import React from 'react';
import { Typography, CardContent, Card as MUICard, CardHeader, IconButton } from '@mui/material';

import * as d3 from "d3";

function RegisterCard({data}) {

  const {
    date,
    station,
    gasType,
    cost,
    liters,
    kilometers,
    efficiency
  } = data;

  const minHeight = efficiency ? 13 : 12

  const formattedDate = d3.timeFormat('%Y-%m-%d')(date);

  return (
    <MUICard sx={{minWidth: 300, minHeight: `${minHeight}em`}}>
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
          {efficiency ? (<><br />{d3.format(".1f")(efficiency) + " Km/L"}</>) : ''}
        </Typography>
      </CardContent>
    </MUICard>
  )
}

export default RegisterCard;

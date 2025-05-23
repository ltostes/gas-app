import React from 'react';
import { Typography, CardContent, Card as MUICard, CardHeader, IconButton, Box, Chip, Divider } from '@mui/material';

import { MetricsContext } from '../MetricsProvider';

import * as d3 from "d3";

function RegisterCard({data}) {

  const {
    id,
    date,
    station,
    gasType,
    cost,
    liters,
    kilometers,
    efficiency
  } = data;

  // Calculated metrics
  const { get_metrics_by_id } = React.useContext(MetricsContext);

  const metrics = get_metrics_by_id(id);

  const minHeight = efficiency ? 13 : 12

  const formattedDate = d3.timeFormat('%Y-%m-%d')(date);

  return (
    <MUICard sx={{minWidth: 300, minHeight: `${minHeight}em`}}>
      <CardContent>
        <Box
          sx={{
            display:'flex',
            flexDirection:'column',
            gap: 1
          }}>
        <Box
          sx={{
            position:'relative',
          }}>
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
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: -5,
                display:'flex',
                flexDirection:'column',
                gap:1
              }}
              >
              <Chip label={`R$ ${d3.format('.2f')(metrics.price)} /L`} />
            </Box>
            </Box>
            {
              !metrics.is_first && <>
                <Divider flexItem/>
                {/* <Typography>Test</Typography> */}
                <Box
                  sx={{
                    display:'flex',
                    justifyContent:'center',
                    gap: 1
                  }}
                >
                  <Chip label={`${d3.format('.1f')(metrics.c_efficiency)} km/L`} />
                  <Chip label={`${d3.format('.0f')(metrics.runkm)} km`} />
                  <Chip label={`${metrics.days_passed} dias`} />
                </Box>
              </>
            }
          </Box>
      </CardContent>
    </MUICard>
  )
}

export default RegisterCard;

import React, { useState } from 'react'

import CardsPanel from './components/CardsPanel'
import AuthDialog from './components/AuthDialog/AuthDialog';
import { AuthContext } from './components/AuthProvider';
import { DataContext } from './components/DataProvider';

import useDelay from './hooks/use-delay';
import useToggle from './hooks/use-toggle';

import NewEntryDialog from './components/NewEntryDialog/NewEntryDialog';
import RegisterCard from './components/RegisterCard/RegisterCard';
import Last30DaysSummary from './components/Last30DaysSummary/Last30DaysSummary';

import { Alert, Paper, Box, Button, Collapse, IconButton, Badge, Tooltip, Typography } from '@mui/material';
import { Close, LocalGasStation, AttachMoney, CalendarMonthOutlined } from '@mui/icons-material';

import * as d3 from 'd3'

function App() {
  const { name, isLogged } = React.useContext(AuthContext)
  const { list , error, isLoading, isValidating} = React.useContext(DataContext)

  const [showInfo, toggleShowInfo] = useToggle(false);
  const [showLast30daysSummary, toggleLast30daysSummary] = useToggle(true);

  // useDelay(() => setShowInfo(true), 200);

  return (
    <>
      <AuthDialog />
      <CardsPanel>
        <Box // Buttons panel
          sx={{
            display:'flex',
            flexDirection:'row',
            gap:2
          }}
          >
          <NewEntryDialog 
            loading={(isLoading || isValidating || error)}
          />
          <Tooltip title={`A tabela de abastecimentos ainda está em desenvolvimento`}>
            <div>
          <IconButton
          disabled
          color='secondary'
          >
            <Badge
              badgeContent={0}
              color="success"
              >
                <LocalGasStation />
            </Badge>
          </IconButton>
            </div>
          </Tooltip>
          <Tooltip title='Os cálculos de eficiência ainda estão em desenvolvimento'>
            <div>
          <IconButton
            disabled
            // onClick={toggleShowInfo}
            color='secondary'
          >
            <Badge
              badgeContent={0}
              color="success"
              >
                <AttachMoney />
            </Badge>
          </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={`Estatísticas dos últimos 30 dias`}>
            <div>
              <IconButton
                disabled
                color='secondary'
                sx={
                  showLast30daysSummary && {
                    color: 'primary.main',
                    bgcolor: 'secondary.main',
                    transition: 'all 0.3s ease',
                    transform: 'scale(1.1)',
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: 'primary.main',
                      transform: 'scale(1.0)'
                    }}
                }
                onClick={toggleLast30daysSummary}
                >
                <Badge
                  badgeContent={0}
                  color="success"
                  >
                    <CalendarMonthOutlined />
                </Badge>
              </IconButton>
            </div>
          </Tooltip>
        </Box>
        <Collapse in={showLast30daysSummary}>
         {/* <Last30DaysSummary /> */}
        </Collapse>
        {
          list && (
            list.sort((a,b) => d3.descending(a.date, b.date))
                .map((d) => <RegisterCard key={d.id} data={d}/>)
          )
        }
      </CardsPanel>
      
    </>
  )
}

export default App

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

import { Alert, Paper, Box, Button, Collapse, IconButton, Badge, Tooltip, Typography, AlertTitle } from '@mui/material';
import { Close, LocalGasStation, AttachMoney, CalendarMonthOutlined } from '@mui/icons-material';

import * as d3 from 'd3'

function App() {
  const { name, isLogged } = React.useContext(AuthContext)
  const { list , error, isLoading, isValidating} = React.useContext(DataContext)

  const [showLast30daysSummary, toggleLast30daysSummary] = useToggle(false);
  
  //// Info
  const defaultInfo = {title:"Info", text:"Information note.", severity:"info", show:false}
  const [infoMessage, setInfoMessage] = React.useState(defaultInfo);
  function dismissInfo() {setInfoMessage({...infoMessage, show: false})};
  
  // Setting hint for when there's no data available
  React.useEffect(() => {
    console.log('TRIED: ',{list})
    if (isLoading || isValidating || typeof list == 'undefined' || list.length > 0) {
      dismissInfo();
      return;
    };
    const noDataInfo = {
      title: "Um prazer ter você por aqui! :)",
      text: <>
          <span>
            Comece fazendo o seu primeiro registro de abastecimento.
            <br/> <i>Assim que tiver 3 registros ou mais as estatísticas estarão disponíveis.</i>
            <br/>
            <br/> Espero que ajude!
          </span>
      </>,
      severity: "info",
      show: true
    }
    const timer = setTimeout(() => setInfoMessage(noDataInfo), 200);

    return () => {
      clearTimeout(timer)
    }
  }, [list, isLoading, isValidating])

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
        {/* <Collapse in={showLast30daysSummary}>
          <Last30DaysSummary />
        </Collapse> */}
        <Collapse 
          in={infoMessage.show}
          >
          <Box>
            <Alert
              severity={infoMessage.severity}
              onClose={dismissInfo}
              >
              <AlertTitle>{infoMessage.title}</AlertTitle>
              {infoMessage.text}
              </Alert>
          </Box>
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

import React, { useState } from 'react'

import CardsPanel from './components/CardsPanel'
import AuthDialog from './components/AuthDialog/AuthDialog';
import { AuthContext } from './components/AuthProvider';
import { DataContext } from './components/DataProvider';

import useDelay from './hooks/use-delay';

import NewEntryDialog from './components/NewEntryDialog/NewEntryDialog';
import RegisterCard from './components/RegisterCard/RegisterCard';

import { Alert, Paper, Box, Button, Collapse, IconButton, Badge, Tooltip } from '@mui/material';
import { Close, LocalGasStation, AttachMoney, CalendarMonthOutlined } from '@mui/icons-material';

import * as d3 from 'd3'

function App() {
  const { name, isLogged } = React.useContext(AuthContext)
  const { list , error, isLoading, isValidating} = React.useContext(DataContext)

  const [showInfo, setShowInfo] = useState(false);


  useDelay(() => setShowInfo(true), 200);

  return (
    <>
      <AuthDialog />
      <CardsPanel>
        <Collapse in={showInfo}>
          <Paper elevation={8}>
            <Alert
              severity='info'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowInfo(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {/* <AlertTitle>Você sabia?</AlertTitle> */}
              Nós teremos infos e dicas aqui como qual foi o posto mais barato no último mês
            </Alert>
          </Paper>
        </Collapse>
        
        <Box
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
          <Tooltip title={`A visão de calendário ainda está em desenvolvimento`}>
            <div>
              <IconButton
                disabled
                color='secondary'
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

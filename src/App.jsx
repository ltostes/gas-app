import React, { useState } from 'react'

import LoggedInfo from './components/LoggedInfo';
import AuthForm from './components/AuthForm';
import Dialog from './components/Dialog';
import CardsPanel from './components/CardsPanel'
import { AuthContext } from './components/AuthProvider';
import { DataContext } from './components/DataProvider';

import useToggle from './hooks/use-toggle';
import useDelay from './hooks/use-delay';

import NewEntryDialog from './components/NewEntryDialog/NewEntryDialog';
import RegisterCard from './components/RegisterCard/RegisterCard';

import { Alert, AlertTitle, Paper, Box, Button, Collapse, IconButton, Badge, Tooltip } from '@mui/material';
import { Close, LocalGasStation, AttachMoney, CalendarMonthOutlined } from '@mui/icons-material';
import { Dialog as MUIDialog } from '@mui/material';

function App() {
  const { name } = React.useContext(AuthContext)
  const { data, error, isLoading, isValidating} = React.useContext(DataContext)
  
  const [showAuthDialog, toggleAuthDialog, setShowAuthDialog] = useToggle(false);
  const [showInfo, setShowInfo] = useState(false);
  
  const isLogged = React.useMemo(() => !(name == ''), [name]);

  React.useEffect(() => {
    setShowAuthDialog(!isLogged);
  }, [isLogged])

  useDelay(() => setShowInfo(true), 200);

  return (
    <>
      <LoggedInfo callback={toggleAuthDialog}/>
      <MUIDialog
        open={showAuthDialog}
        onClose={() => isLogged && toggleAuthDialog()}
      >
        <Box
          padding={5}
        >
          <AuthForm submitCallback={toggleAuthDialog}/>
        </Box>
      </MUIDialog>
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
              <AlertTitle>Você sabia?</AlertTitle>
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
          data?.map((d) => <RegisterCard key={d.id} data={d}/>)
        }
      </CardsPanel>
      
    </>
  )
}

export default App

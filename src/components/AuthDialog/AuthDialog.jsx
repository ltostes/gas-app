import React from 'react';

import Button from '../Button';
import { AuthContext } from '../AuthProvider';

import { Stack, TextField, Typography, Box, IconButton, Dialog, DialogActions, Tooltip } from '@mui/material';
import { InfoOutline } from '@mui/icons-material';

import LoggedInfo from '../LoggedInfo';
import GasAppLogo from '../GasAppLogo';

function AuthDialog() {
  const {
    code,
    name,
    saveAuth,
    isLogged
  } = React.useContext(AuthContext);

  const [showAuthDialog, setShowAuthDialog] = React.useState(false);

  const [inputCode, setInputCode] = React.useState('');
  const [inputName, setInputName] = React.useState('');

  function onChangeHandlerInputCode(event) {
    const raw = event.target.value;
    const nextInputCode = raw.toUpperCase();
    setInputCode(nextInputCode);
  }

  function clearInputs() {
    setInputCode(code);
    setInputName(name);
  };

  function generateRandomCode() {
    return Array(5).fill().map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
  }

  function handleClose() {
    isLogged && setShowAuthDialog(false); // Only able to close when it is logged in, to force log in
  }

  function handleOpen() {
    clearInputs();
    setShowAuthDialog(true);
  }

  // If isn't logged, open
  React.useEffect(() => {
    setShowAuthDialog(!isLogged);  // !isLogged instead of True, so it doesn't open on load
    if (!isLogged) {
      setInputCode(generateRandomCode());
    }
  }, [isLogged])

  function handleSubmit(event) {
    event.preventDefault();

    if (inputCode == '' || inputName == '') {
      return;
    }

    saveAuth({inputCode, inputName});
    handleClose();
  };

  function IntroMessage() {
    return (<>
      <Typography variant='h5'>
        Olá
      </Typography>
      <Typography variant='subtitle2'>
        O <i><strong>GasApp</strong></i> te espera{inputName ? `, ${inputName}!` : ''}
      </Typography>
    </>)
  }

  return (
    <>
      <LoggedInfo callback={handleOpen}/>
      <Dialog
        open={showAuthDialog}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit
          }
        }}
      >
        <Box
          padding={2}
        >
          <Stack
            spacing={2}
            maxWidth={350}
          >
            <Box>
              <IntroMessage />
              <GasAppLogo 
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}
              />
            </Box>
            <TextField
              label='Nome'
              margin='normal'
              placeholder='José Gasolina'
              value={inputName}
              onChange={(event) => setInputName(event.target.value)}
            />
            <Box
              sx={{
                display:'flex',
                flexDirection:'row',
                alignItems: 'center'
              }}
            >
              <TextField
                label='Código'
                placeholder='HERBIE'
                value={inputCode}
                onChange={onChangeHandlerInputCode}
                sx={{flexGrow:1}}
                />
              <Box>
                <Tooltip
                  title={<span>
                          Este código é um identificador para os seus registros, salve em algum lugar para não esquecer.
                          <br/> <i>(Talvez mandando mensagem pra si mesmo no zap?)</i>
                          <br/>
                          <br/> Fique à vontade para mudar o código para o quiser!
                        </span>}
                >
                  <IconButton
                    color='primary'
                    >
                    <InfoOutline />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <DialogActions>
              <Button
                type='submit'
              >Confirmar Identificação</Button>
            </DialogActions>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}

export default AuthDialog;

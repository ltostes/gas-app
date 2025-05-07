import React from 'react';
import styles from './NewEntryDialog.module.css'

import * as d3 from "d3";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, Button as MUIButton, Stack } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { yellow } from '@mui/material/colors';

import Button from '../Button';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import NewEntryTextField from '../NewEntryTextField/NewEntryTextField';
import { DataContext } from '../DataProvider';
import { AspectRatio } from '@radix-ui/themes';

const gasTypeStdOptions = [
  'Gasolina Comum',
  'Álcool',
  'Gasolina Aditivada',
  'Diesel'
]

const inputSizeStd = 'small';

function NewEntryDialog({ loading }) {
  // Dialog handling
  const [open, setOpen] = React.useState()
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, dataAdd } = React.useContext(DataContext)
  const today = new Date();

  const [date, setDate] = React.useState(today);
  const [station, setStation] = React.useState('');
  const [cost, setCost] = React.useState(0);
  const [liters, setLiters] = React.useState(0);
  const [kilometers, setKilometers] = React.useState(0);
  const [gasType, setGasType] = React.useState(gasTypeStdOptions[0]);

  function handleSubmit(event) {
    event.preventDefault();
    const newEntry = {date, station, cost, liters, kilometers, gasType};
    dataAdd(newEntry);
  }

  const isSubmittable = (
      true
      && station
      && cost > 0
      && liters > 0
      && kilometers > 0
  )

  const stationOptions = React.useMemo(() => {
    const rawStations = data?.map(({station}) => station).filter(f => f);
    const uniqueStations = [...new Set(rawStations)];

    return uniqueStations
  }
  , [data]);

  return (
    <>
      <Button 
        onClick={handleClickOpen}
        style={{
          backgroundColor: yellow[700], 
          color: 'black',
          aspectRatio: 1
        }}
      >
        +
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit
          }
        }}
      >
        {/* <DialogTitle>Dadsds</DialogTitle> */}
        <DialogContent>
          <Stack
            direction='column'
            spacing={2}
            sx={{paddingTop: 1}}
          >
          <DatePicker 
            format='y-M-d'
            value={date}
            onChange={setDate}
            label='Data do abastecimento'
            />
          <Autocomplete
            disablePortal
            size={inputSizeStd}
            freeSolo
            options={stationOptions}
            value={station}
            onChange={(event, newValue) => setStation(newValue)}
            renderInput={(params) => <TextField 
              {...params}
              label="Em qual posto foi abastecido?" 
              />}
              />
          <Autocomplete
            disablePortal
            freeSolo
            options={gasTypeStdOptions}
            value={gasType}
            onChange={(event, newValue) => setGasType(newValue)}
            renderInput={(params) => <TextField 
                                        {...params}
                                        label="Tipo de combustível" 
                        />}
            size={inputSizeStd}
            />
          <TextField 
            label='Total Pago'
            margin='normal'
            placeholder='0,00'
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            type='number'
            slotProps={{
              htmlInput : {
                step:0.01,
                min: 0,
                max: 100,
              },
              input: {
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              },
            }}
            size={inputSizeStd}
            />
          <TextField 
            label='Litros abastecidos'
            margin='normal'
            type='number'
            placeholder='0,000'
            value={liters}
            onChange={(event) => setLiters(event.target.value)}
            slotProps={{
              htmlInput : {
                step:0.001,
                min: 0,
                max: 500,
              },
              input: {
                endAdornment: <InputAdornment 
                sx={{marginLeft: 1}}
                position="start"
                >L</InputAdornment>,
              },
            }}
            size={inputSizeStd}
            />
          <TextField 
            label='Total do odômetro'
            margin='normal'
            type='number'
            placeholder=''
            value={kilometers}
            onChange={(event) => setKilometers(event.target.value)}
            slotProps={{
              htmlInput : {
                step:1,
                min: 0,
              },
              input: {
                endAdornment: <InputAdornment 
                position="start"
                sx={{marginLeft: 1}}
                >Km</InputAdornment>,
              },
            }}
            size={inputSizeStd}
          />
          </Stack>
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={handleClose}>Cancelar</MUIButton>
          <MUIButton 
              type="submit"
              variant='contained'
              disabled={!isSubmittable}
            >Salvar</MUIButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewEntryDialog;

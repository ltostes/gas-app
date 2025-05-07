import React from 'react';
import styles from './NewEntryDialog.module.css'

import * as d3 from "d3";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton, Button as MUIButton, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import Button from '../Button';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DataContext } from '../DataProvider';

const gasTypeStdOptions = [
  'Gasolina Comum',
  'Álcool',
  'Gasolina Aditivada'
]

const inputSizeStd = 'small';

function NewEntryDialog({ loading }) {
  // Dialog handling
  const [open, setOpen] = React.useState()
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, dataAdd } = React.useContext(DataContext)
  const today = new Date();

  const stdValues = React.useMemo(() => ({date: today, station: '', cost: 0, liters: 0, kilometers: 0, gasType: gasTypeStdOptions[0], efficiency: ''}),[])

  const [date, setDate] = React.useState(stdValues.date);
  const [station, setStation] = React.useState(stdValues.station);
  const [cost, setCost] = React.useState(stdValues.cost);
  const [liters, setLiters] = React.useState(stdValues.liters);
  const [kilometers, setKilometers] = React.useState(stdValues.kilometers);
  const [gasType, setGasType] = React.useState(stdValues.gasType);
  const [efficiency, setEfficiency] = React.useState(stdValues.efficiency);

  function clearFields() {
    setDate(stdValues.date);
    setStation(stdValues.station);
    setCost(stdValues.cost);
    setLiters(stdValues.liters);
    setKilometers(stdValues.kilometers);
    setGasType(stdValues.gasType);
    setEfficiency(stdValues.efficiency);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newEntry = {date, station, cost, liters, kilometers, gasType, efficiency};
    dataAdd(newEntry);
    clearFields();
    handleClose();
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
      <IconButton 
        onClick={handleClickOpen}
        // color='secondary'
        loading={loading}
        sx={{
          color: 'primary.main',
          bgcolor: 'secondary.main',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'secondary.main', // Darker shade of secondary
            color: 'primary.main', // Lighter shade of primary
            transform: 'scale(1.1)'
          }
        }}
      >
        <Add />
      </IconButton>
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
        <DialogTitle>Tô abastecendo!</DialogTitle>
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
                max: 500,
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
                max: 100,
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
          <TextField 
            label='Eficiência'
            helperText="(caso disponível)"
            margin='normal'
            type='number'
            placeholder=''
            value={efficiency}
            onChange={(event) => setEfficiency(event.target.value)}
            slotProps={{
              htmlInput : {
                step:0.1,
                min: 0,
              },
              input: {
                endAdornment: <InputAdornment 
                position="start"
                sx={{marginLeft: 2}}
                >Km/L</InputAdornment>,
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

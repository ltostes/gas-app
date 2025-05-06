import React from 'react';

import { Box, Button, Dialog, Flex, Text, TextField, VisuallyHidden } from '@radix-ui/themes';
import * as d3 from "d3";

import NewEntryTextField from '../NewEntryTextField/NewEntryTextField';
import { DataContext } from '../DataProvider';

function NewEntryDialog({ loading }) {
  const { dataAdd } = React.useContext(DataContext)
  const today = d3.timeFormat("%d/%m/%Y")(new Date());

  const [date, setDate] = React.useState(today);
  const [station, setStation] = React.useState('');
  const [cost, setCost] = React.useState('');
  const [liters, setLiters] = React.useState('');
  const [kilometers, setKilometers] = React.useState('');

  function handleSubmit(event) {
    const newEntry = {date, station, cost, liters, kilometers};
    console.log(newEntry);
    dataAdd(newEntry);
  }

  return (
    <>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button loading={loading}>+</Button>
          </Dialog.Trigger>
          <Dialog.Content 
            // maxWidth="450px"
          >
            <Dialog.Title><VisuallyHidden>Novo Registro de Gasolina</VisuallyHidden></Dialog.Title>
            <Dialog.Description><VisuallyHidden>Formulário para inclusão de novo registro de gasolina.</VisuallyHidden></Dialog.Description>

            <NewEntryTextField
              label="Data"
              placeholder="Data do abastecimento"
              value={date}
              setValue={setDate}
              />
            <NewEntryTextField
              label="Posto"
              placeholder="Posto em que foi abastecido"
              value={station}
              setValue={setStation}
              />
            <NewEntryTextField
              label="R$"
              placeholder="Preço total em reais"
              value={cost}
              setValue={setCost}
              />
            <NewEntryTextField
              label="L"
              placeholder="Total abastecido em litros"
              value={liters}
              setValue={setLiters}
              />
            <NewEntryTextField
              label="Km"
              placeholder="Total do hodômetro do carro em Km, no momento do abastecimento"
              value={kilometers}
              setValue={setKilometers}
              />

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={handleSubmit}>Save</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
    </>
  )
}

export default NewEntryDialog;

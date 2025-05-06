import React from 'react';

import { Flex, Text, TextField, Box } from '@radix-ui/themes';

function NewEntryTextField({label, placeholder, value, setValue}) {
  return (
  <Flex direction="column" gap="3">
    <Flex gap="3" mt="4" justify="start" align="baseline">
      <Box minWidth="50px">
      <Text as="div" size="3" mb="2" weight="bold">
        {label}
      </Text>
      </Box>
      <Box flexGrow="1">
        <TextField.Root
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Box>
    </Flex>
  </Flex>)
}

export default NewEntryTextField;

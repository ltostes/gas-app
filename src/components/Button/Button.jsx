import React from 'react';

import styles from './Button.module.css'
import { Button as MUIButton } from '@mui/material';

function Button({ children, ...delegated }) {
  return (
    <MUIButton
      // className={styles.button}
      {...delegated}
      >
        {children}
    </MUIButton>
  );
}

export default Button;

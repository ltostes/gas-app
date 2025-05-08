import React from 'react';
import styles from './LoggedInfo.module.css'

import Button from '../Button';
import { AuthContext } from '../AuthProvider';

function LoggedInfo({callback}) {
  const {
    name,
  } = React.useContext(AuthContext);

  return <>
    <div
      className={styles.loggedInfo}
    >
      <Button 
        color='secondary'
        variant='outlined'
        onClick={callback}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main
        }}
        >
        <strong>{name || 'Loading...'}</strong>
      </Button>
    </div>
  </>;
}

export default LoggedInfo;

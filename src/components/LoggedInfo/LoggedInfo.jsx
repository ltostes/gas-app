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
        onClick={callback}
        >
        <strong>{name || 'Loading...'}</strong>
      </Button>
    </div>
  </>;
}

export default LoggedInfo;

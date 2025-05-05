import React from 'react';
import Button from '../Button';
import styles from './NewEntryButton.module.css'

function NewEntryButton({callback}) {
  return <>
    <div
      className={styles.wrapper}
      >
      <Button 
        onClick={callback}
        className={styles.button} // Not working
        >
        <strong>+</strong>
      </Button>
    </div>
  </>;
}

export default NewEntryButton;

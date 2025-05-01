import React from 'react';
import { X as Close } from 'react-feather';

import useKeyDown from '../../hooks/use-keydown';

import styles from './Dialog.module.css';

function Dialog({ handleDismiss, enableClose, children }) {
  useKeyDown('Escape', () => enableClose && handleDismiss());

  return (
    <div className={styles.wrapper}>
      <div className={styles.backdrop} />
      <div className={styles.dialog}>
        {enableClose && <div
          className={styles.closeBtn}
          onClick={handleDismiss}
        >
          <Close />
        </div>}
        {children}
      </div>
    </div>
  )
}

export default Dialog;

import React from 'react';

import styles from './Button.module.css'

function Button({ children, ...delegated }) {
  return (
    <button
      className={styles.button}
      {...delegated}
      >
        {children}
    </button>
  );
}

export default Button;

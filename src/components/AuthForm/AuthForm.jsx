import React from 'react';

import styles from './AuthForm.module.css'

import Button from '../Button';
import { AuthContext } from '../AuthProvider';

function AuthForm({ submitCallback }) {
  const {
    code,
    name,
    saveAuth
  } = React.useContext(AuthContext);

  const [inputCode, setInputCode] = React.useState(code);
  const [inputName, setInputName] = React.useState(name);

  function handleSubmit(event) {
    event.preventDefault();

    if (inputCode == '' || inputName == '') {
      return;
    }

    saveAuth({inputCode, inputName});
    setInputCode('');
    setInputName('');
    submitCallback();
  };

  return (
  <form
    className={styles.wrapper}
    onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <div className={styles.inputWrapper}>
          <label 
            htmlFor='code-field'
            className={styles.label}
            >
            Code:
          </label>
          <input
            id="code-field"
            className={styles.textInput}
            value={inputCode}
            onChange={(event) => setInputCode(event.target.value)}
            >
          </input>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputWrapper}>
          <label 
            htmlFor='name-field'
            className={styles.label}
            >
            Name:
          </label>
          <input
            id="name-field"
            className={styles.textInput}
            value={inputName}
            onChange={(event) => setInputName(event.target.value)}
            >
          </input>
        </div>
      </div>
      <div 
        className={styles.row}
        style={{
          justifyContent: 'space-evenly',
          marginTop: 12
        }}
        >
        {/* <Button>
          Check
        </Button> */}
        <Button>
          Ok!
        </Button>
      </div>
  </form>
  );
}

export default AuthForm;

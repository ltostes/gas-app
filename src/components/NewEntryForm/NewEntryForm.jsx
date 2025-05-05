import React from 'react';

import styles from './NewEntryForm.module.css'

import Button from '../Button';
import { DataContext} from '../DataProvider';

function NewEntryForm({ submitCallback }) {

  const { dataAdd } = React.useContext(DataContext);

  const [inputTest, setInputTest] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (inputTest == '') {
      return;
    }

    dataAdd(inputTest);
    setInputTest('');
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
            htmlFor='test-field'
            className={styles.label}
            >
            Test increment:
          </label>
          <input
            id="test-field"
            className={styles.textInput}
            value={inputTest}
            onChange={(event) => setInputTest(event.target.value)}
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
          Let's test it out!!
        </Button>
      </div>
  </form>
  );
}

export default NewEntryForm;

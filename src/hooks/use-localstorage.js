import React from "react";

// TODO

function useLocalStorage(varName, defaultValue) {

    const [var, setVar] = React.useState('');

    React.useEffect(() => {
        const local = localStorage.getItem(varName);

        if (local) {
            setVar()
        }
    }, [])

    //   React.useEffect(() => {
    //     const localCode = localStorage.getItem('code');
    //     const localName = localStorage.getItem('name');
    
    //     if (localCode) {
    //       setCode(localCode);
    //     }
    //     if (localName) {
    //       setName(localName);
    //     }
    
    //     console.log({localCode, localName})
    //   }, []);
    
    //   function saveAuth({inputName, inputCode}) {
    //     setName(inputName);
    //     setCode(inputCode);
    //     localStorage.setItem('code', code);
    //     localStorage.setItem('name', name);
    //     console.log('Saved to storage!')
}
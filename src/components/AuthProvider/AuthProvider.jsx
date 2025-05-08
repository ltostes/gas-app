import React from 'react';

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [code, setCode] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    const localCode = localStorage.getItem('code');
    const localName = localStorage.getItem('name');

    if (localCode) {
      setCode(localCode);
    }
    if (localName) {
      setName(localName);
    }
  }, []);

  function saveAuth({inputName, inputCode}) {
    setName(inputName);
    setCode(inputCode);
    localStorage.setItem('code', inputCode);
    localStorage.setItem('name', inputName);
  }
  
  const isLogged = React.useMemo(() => !(name == ''), [name]);

  const ctx = {
    code,
    name,
    saveAuth,
    isLogged
  };

  return (
    <AuthContext.Provider
      value={ctx}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

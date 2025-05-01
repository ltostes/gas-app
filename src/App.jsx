import React from 'react'
import './reset.css'

import LoggedInfo from './components/LoggedInfo';
import AuthForm from './components/AuthForm';
import Dialog from './components/Dialog';
import CardsPanel from './components/CardsPanel'
import Card from './components/Card'
import { AuthContext } from './components/AuthProvider';

import useToggle from './hooks/use-toggle';

function App() {
  const { name } = React.useContext(AuthContext)
  
  const [showDialog, toggleDialog, setShowDialog] = useToggle(false);
  
  const isLogged = React.useMemo(() => !(name == ''), [name]);

  React.useEffect(() => {
    setShowDialog(!isLogged);
  }, [isLogged])


  return (
    <>
      <LoggedInfo callback={toggleDialog}/>
      {
        showDialog && 
          <Dialog 
            handleDismiss={toggleDialog}
            enableClose={isLogged}
            >
            <AuthForm submitCallback={toggleDialog}/>
          </Dialog>
      }
      <CardsPanel>
        <Card>Oi</Card>
        <Card>Voce</Card>
        <Card>Como</Card>
        <Card>Vai</Card>
      </CardsPanel>
    </>
  )
}

export default App

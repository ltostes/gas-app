import React from 'react'
import './reset.css'

import LoggedInfo from './components/LoggedInfo';
import AuthForm from './components/AuthForm';
import Dialog from './components/Dialog';
import CardsPanel from './components/CardsPanel'
import Card from './components/Card'
import { AuthContext } from './components/AuthProvider';
import { DataContext } from './components/DataProvider';

import useToggle from './hooks/use-toggle';
import NewEntryButton from './components/NewEntryButton/NewEntryButton';
import NewEntryForm from './components/NewEntryForm/NewEntryForm';

function App() {
  const { name } = React.useContext(AuthContext)
  const { data, error, isLoading} = React.useContext(DataContext)
  
  const [showAuthDialog, toggleAuthDialog, setShowAuthDialog] = useToggle(false);
  const [showNewEntryDialog, toggleNewEntryDialog, setShowNewEntryDialog] = useToggle(false);
  
  const isLogged = React.useMemo(() => !(name == ''), [name]);

  React.useEffect(() => {
    setShowAuthDialog(!isLogged);
  }, [isLogged])

  const statusBackground = isLoading ? 'yellow' : 'green'

  return (
    <>
      <LoggedInfo callback={toggleAuthDialog}/>
      {
        showAuthDialog && 
          <Dialog 
            handleDismiss={toggleAuthDialog}
            enableClose={isLogged}
            >
            <AuthForm submitCallback={toggleAuthDialog}/>
          </Dialog>
      }
      {
        showNewEntryDialog && 
          <Dialog 
            handleDismiss={toggleNewEntryDialog}
            >
            <NewEntryForm submitCallback={toggleNewEntryDialog}/>
          </Dialog>
      }
      <CardsPanel>
        <NewEntryButton callback={toggleNewEntryDialog}/>
        {
          data?.map((d) => <Card key={d}>{d}</Card>)
        }
      </CardsPanel>
      <div style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        width: '10px',
        height: '10px',
        borderRadius: '100%',
        background: statusBackground
      }}/>
    </>
  )
}

export default App

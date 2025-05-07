import React from 'react'

import LoggedInfo from './components/LoggedInfo';
import AuthForm from './components/AuthForm';
import Dialog from './components/Dialog';
import CardsPanel from './components/CardsPanel'
import Card from './components/Card'
import { AuthContext } from './components/AuthProvider';
import { DataContext } from './components/DataProvider';

import useToggle from './hooks/use-toggle';

import NewEntryDialog from './components/NewEntryDialog/NewEntryDialog';
import { Flex } from '@radix-ui/themes';
import RegisterCard from './components/RegisterCard/RegisterCard';

function App() {
  const { name } = React.useContext(AuthContext)
  const { data, error, isLoading, isValidating} = React.useContext(DataContext)
  
  const [showAuthDialog, toggleAuthDialog, setShowAuthDialog] = useToggle(false);
  
  const isLogged = React.useMemo(() => !(name == ''), [name]);

  React.useEffect(() => {
    setShowAuthDialog(!isLogged);
  }, [isLogged])

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
      <CardsPanel>
        <NewEntryDialog
          loading={isLoading || isValidating}
          />
        {
          data?.map((d) => <RegisterCard key={d.id} data={d}/>)
        }
      </CardsPanel>
      
    </>
  )
}

export default App

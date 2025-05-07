import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './reset.css'

import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import AuthProvider from './components/AuthProvider';
import DataProvider from './components/DataProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <Theme
          accentColor='amber'
          appearance='dark'
          radius='large'
        > 
          <LocalizationProvider dateAdapter={AdapterDateFns}> {/* Required for the date picker */}
            <App />
          </LocalizationProvider>
        </Theme>
      </DataProvider>
    </AuthProvider>
  </StrictMode>
)

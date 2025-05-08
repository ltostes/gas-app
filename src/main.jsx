import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './reset.css'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createTheme, ThemeProvider } from '@mui/material';
import { amber, indigo } from '@mui/material/colors';

import AuthProvider from './components/AuthProvider';
import DataProvider from './components/DataProvider';
import MetricsProvider from './components/MetricsProvider';

const customTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <MetricsProvider>
          <ThemeProvider
            theme={customTheme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}> {/* Required for the date picker */}
              <App />
            </LocalizationProvider>
          </ThemeProvider>
        </MetricsProvider>
      </DataProvider>
    </AuthProvider>
  </StrictMode>
)

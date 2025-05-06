import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './reset.css'

import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';

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
          <App />
        </Theme>
      </DataProvider>
    </AuthProvider>
  </StrictMode>
)

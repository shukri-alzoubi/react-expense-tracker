import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ThemeProvider } from './context/Theme.context.jsx';
import { AuthProvider } from './context/Auth.context.jsx';
import { NotifierProvider } from './context/Notifier.context.jsx';
import { FirestoreProvider } from './context/Firestore.context.jsx';
import { OnlineProvider } from './context/Online.context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <OnlineProvider>
        <NotifierProvider>
          <AuthProvider>
            <FirestoreProvider>
              <App />
            </FirestoreProvider>
          </AuthProvider>
        </NotifierProvider>
      </OnlineProvider>
    </ThemeProvider>
  </StrictMode>,
)

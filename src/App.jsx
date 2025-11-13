import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/routing/ProtectedRoute';
import GuestRoute from './components/routing/GuestRoute';

import './App.css';
import RegisterPage from './pages/auth/Register.page';
import DashboardPage from './pages/Dashboard.page';
import TransactionsPage from './pages/Transactions.page';
import SettingsPage from './pages/Settings.page';
import HomePage from './pages/Home.page';
import AboutPage from './pages/About.page';
import PrivacyPolicyPage from './pages/PrivacyPolicy.page';
import NotFoundPage from './pages/NotFound.page';
import ContactPage from './pages/Contact.page';

function App() {

  return (<BrowserRouter>
    <Routes>
      
      {/* Guest Routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<GuestRoute><RegisterPage /></GuestRoute>} />

      {/* Auth Routes */}
      <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path='/transactions' element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
      <Route path='/settings' element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path='/about' element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
      <Route path='/privacy-policy' element={<ProtectedRoute><PrivacyPolicyPage /></ProtectedRoute>} />
      <Route path='/contact' element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />

      {/* Not Found */}
      <Route path='*' element={<NotFoundPage />} />

    </Routes>
  </BrowserRouter>)
}

export default App

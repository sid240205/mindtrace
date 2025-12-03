import { Route, Routes } from 'react-router'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import InteractionHistory from './pages/InteractionHistory'
import ContactsDirectory from './pages/ContactsDirectory'
import AlertsNotifications from './pages/AlertsNotifications'
import RemindersCalendar from './pages/RemindersCalendar'
import SOSSettings from './pages/SOSSettings'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Dashboard Routes */}
        <Route path='/dashboard' element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
        <Route path='/dashboard/interactions' element={<DashboardLayout><InteractionHistory /></DashboardLayout>} />
        <Route path='/dashboard/contacts' element={<DashboardLayout><ContactsDirectory /></DashboardLayout>} />
        <Route path='/dashboard/alerts' element={<DashboardLayout><AlertsNotifications /></DashboardLayout>} />
        <Route path='/dashboard/reminders' element={<DashboardLayout><RemindersCalendar /></DashboardLayout>} />
        <Route path='/dashboard/sos' element={<DashboardLayout><SOSSettings /></DashboardLayout>} />
      </Routes>
    </>
  )
}

export default App

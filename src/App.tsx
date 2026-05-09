import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppShell } from './components/layout/AppShell'
import { Dashboard } from './features/dashboard/components/Dashboard'
import { HealthTracking } from './features/health-tracking/components/HealthTracking'
//import { Nutrition } from './features/nutrition/components/Nutrition'
import { Exercise } from './features/exercise/components/Exercise'
import { Meditation } from './features/meditation/components/Meditation'
import { Notes } from './features/notes/components/Notes'
import { Auth } from './features/auth/components/Auth'
import { useStore } from './core/hooks/useStore'

function AnimatedRoutes() {
  const location = useLocation()
  const { isAuthenticated } = useStore(state => state.auth)

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/auth'} replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/health" element={<HealthTracking />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/notes" element={<Notes />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

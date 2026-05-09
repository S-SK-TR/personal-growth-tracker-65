import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Dumbbell, Apple, Heart, BookOpen, Moon, Sun, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/core/hooks/useStore'

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/health', icon: Heart, label: 'Health' },
  { to: '/nutrition', icon: Apple, label: 'Nutrition' },
  { to: '/exercise', icon: Dumbbell, label: 'Exercise' },
  { to: '/meditation', icon: BookOpen, label: 'Meditation' }
]

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { logout } = useStore(state => state)
  const location = useLocation()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.theme = isDarkMode ? 'light' : 'dark'
  }

  return (
    <div className="flex h-screen bg-mesh-light dark:bg-mesh-dark bg-background text-text-primary">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-surface text-text-primary"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: isSidebarOpen ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface/80 backdrop-blur-md border-r border-white/10 transform md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:flex flex-col`}
      >
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-text-primary">Growth Tracker</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-white/10">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive ? 'bg-primary-500/20 text-primary-500' : 'text-text-secondary hover:bg-white/10'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              logout()
              setIsSidebarOpen(false)
            }}
            className="w-full px-4 py-3 text-left text-text-secondary hover:bg-white/10 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
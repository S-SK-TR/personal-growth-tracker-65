import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useStore } from '@/core/hooks/useStore'
import { useNavigate } from 'react-router-dom'
import { GlassCard } from '@/components/ui/GlassCard'
import { motion } from 'framer-motion'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

export function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const { login } = useStore(state => state)
  const navigate = useNavigate()

  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: loginErrors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: registerErrors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onLoginSubmit = (data: LoginFormData) => {
    // In a real app, you would authenticate with your backend here
    login({
      id: '1',
      name: 'John Doe',
      email: data.email
    })
    navigate('/dashboard')
  }

  const onRegisterSubmit = (data: RegisterFormData) => {
    // In a real app, you would register with your backend here
    login({
      id: '1',
      name: data.name,
      email: data.email
    })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <GlassCard className="w-full max-w-md p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>

          {isLogin ? (
            <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  {...registerLogin('email')}
                  className="w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {loginErrors.email && <p className="mt-1 text-sm text-red-500">{loginErrors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  {...registerLogin('password')}
                  className="w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {loginErrors.password && <p className="mt-1 text-sm text-red-500">{loginErrors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitRegister(onRegisterSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  {...registerRegister('name')}
                  className="w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {registerErrors.name && <p className="mt-1 text-sm text-red-500">{registerErrors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  {...registerRegister('email')}
                  className="w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {registerErrors.email && <p className="mt-1 text-sm text-red-500">{registerErrors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  {...registerRegister('password')}
                  className="w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {registerErrors.password && <p className="mt-1 text-sm text-red-500">{registerErrors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Register
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary-500 hover:text-primary-400"
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  )
}
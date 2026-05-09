import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createContext, useContext } from 'react'
import { useStore as useZustandStore } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
  } | null
}

interface AuthActions {
  login: (user: AuthState['user']) => void
  logout: () => void
}

interface HealthTrackingState {
  measurements: {
    date: string
    weight: number
    height: number
    bmi: number
  }[]
}

interface HealthTrackingActions {
  addMeasurement: (measurement: HealthTrackingState['measurements'][0]) => void
  updateMeasurement: (date: string, updatedMeasurement: Partial<HealthTrackingState['measurements'][0]>) => void
  deleteMeasurement: (date: string) => void
}

interface NutritionState {
  meals: {
    id: string
    date: string
    name: string
    calories: number
    protein: number
    carbs: number
    fat: number
  }[]
}

interface NutritionActions {
  addMeal: (meal: NutritionState['meals'][0]) => void
  updateMeal: (id: string, updatedMeal: Partial<NutritionState['meals'][0]>) => void
  deleteMeal: (id: string) => void
}

interface ExerciseState {
  workouts: {
    id: string
    date: string
    type: string
    duration: number
    caloriesBurned: number
  }[]
}

interface ExerciseActions {
  addWorkout: (workout: ExerciseState['workouts'][0]) => void
  updateWorkout: (id: string, updatedWorkout: Partial<ExerciseState['workouts'][0]>) => void
  deleteWorkout: (id: string) => void
}

type Store = AuthState & AuthActions & HealthTrackingState & HealthTrackingActions & NutritionState & NutritionActions & ExerciseState & ExerciseActions

export const StoreContext = createContext<ReturnType<typeof createStore>>(null!)

export const useStore = () => {
  const api = useContext(StoreContext)
  return useZustandStore(api)
}

export const createStore = () => create<Store>()(
  persist(
    (set) => ({
      // Auth State
      isAuthenticated: false,
      user: null,

      // Auth Actions
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),

      // Health Tracking State
      measurements: [],

      // Health Tracking Actions
      addMeasurement: (measurement) => set((state) => ({
        measurements: [...state.measurements, measurement]
      })),
      updateMeasurement: (date, updatedMeasurement) => set((state) => ({
        measurements: state.measurements.map((m) =>
          m.date === date ? { ...m, ...updatedMeasurement } : m
        )
      })),
      deleteMeasurement: (date) => set((state) => ({
        measurements: state.measurements.filter((m) => m.date !== date)
      })),

      // Nutrition State
      meals: [],

      // Nutrition Actions
      addMeal: (meal) => set((state) => ({
        meals: [...state.meals, meal]
      })),
      updateMeal: (id, updatedMeal) => set((state) => ({
        meals: state.meals.map((m) =>
          m.id === id ? { ...m, ...updatedMeal } : m
        )
      })),
      deleteMeal: (id) => set((state) => ({
        meals: state.meals.filter((m) => m.id !== id)
      })),

      // Exercise State
      workouts: [],

      // Exercise Actions
      addWorkout: (workout) => set((state) => ({
        workouts: [...state.workouts, workout]
      })),
      updateWorkout: (id, updatedWorkout) => set((state) => ({
        workouts: state.workouts.map((w) =>
          w.id === id ? { ...w, ...updatedWorkout } : w
        )
      })),
      deleteWorkout: (id) => set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id)
      }))
    }),
    {
      name: 'growth-tracker-storage'
    }
  )
)
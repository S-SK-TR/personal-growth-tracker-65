import { GlassCard } from '@/components/ui/GlassCard'
import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'
import { useStore } from '@/core/hooks/useStore'
import { Heart, Apple, Dumbbell, BookOpen, Target, TrendingUp, TrendingDown } from 'lucide-react'
import { motion } from 'framer-motion'

const DEMO_MEASUREMENTS = [
  { date: '2024-05-01', weight: 72.5, height: 175, bmi: 23.8 },
  { date: '2024-05-08', weight: 72.2, height: 175, bmi: 23.6 },
  { date: '2024-05-15', weight: 71.8, height: 175, bmi: 23.4 }
]

const DEMO_MEALS = [
  { id: '1', date: '2024-05-15', name: 'Breakfast', calories: 450, protein: 25, carbs: 50, fat: 15 },
  { id: '2', date: '2024-05-15', name: 'Lunch', calories: 600, protein: 30, carbs: 60, fat: 20 },
  { id: '3', date: '2024-05-15', name: 'Dinner', calories: 700, protein: 35, carbs: 70, fat: 25 }
]

const DEMO_WORKOUTS = [
  { id: '1', date: '2024-05-15', type: 'Running', duration: 30, caloriesBurned: 300 },
  { id: '2', date: '2024-05-15', type: 'Weight Training', duration: 45, caloriesBurned: 250 },
  { id: '3', date: '2024-05-15', type: 'Yoga', duration: 20, caloriesBurned: 100 }
]

export function Dashboard() {
  const { measurements, meals, workouts } = useStore(state => ({
    measurements: state.measurements.length > 0 ? state.measurements : DEMO_MEASUREMENTS,
    meals: state.meals.length > 0 ? state.meals : DEMO_MEALS,
    workouts: state.workouts.length > 0 ? state.workouts : DEMO_WORKOUTS
  }))

  const latestMeasurement = measurements[measurements.length - 1]
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalWorkoutTime = workouts.reduce((sum, workout) => sum + workout.duration, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>

      {/* Stats Grid */}
      <BentoGrid>
        <BentoCard className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-text-secondary">Current Weight</h3>
              <p className="text-3xl font-bold text-text-primary mt-1">{latestMeasurement.weight} kg</p>
            </div>
            <Heart className="w-10 h-10 text-primary-500" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {latestMeasurement.bmi < 25 ? (
              <TrendingDown className="w-4 h-4 text-secondary-500" />
            ) : (
              <TrendingUp className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-text-secondary">BMI: {latestMeasurement.bmi.toFixed(1)}</span>
          </div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-text-secondary">Calories Today</h3>
              <p className="text-3xl font-bold text-text-primary mt-1">{totalCalories}</p>
            </div>
            <Apple className="w-10 h-10 text-primary-500" />
          </div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-text-secondary">Workout Time</h3>
              <p className="text-3xl font-bold text-text-primary mt-1">{totalWorkoutTime} min</p>
            </div>
            <Dumbbell className="w-10 h-10 text-primary-500" />
          </div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-text-secondary">Meditation</h3>
              <p className="text-3xl font-bold text-text-primary mt-1">15 min</p>
            </div>
            <BookOpen className="w-10 h-10 text-primary-500" />
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-2">
          <h3 className="text-lg font-medium text-text-secondary mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {measurements.slice(-3).reverse().map((measurement) => (
              <div key={measurement.date} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">{new Date(measurement.date).toLocaleDateString()}</p>
                  <p className="font-medium text-text-primary">Weight: {measurement.weight} kg</p>
                </div>
                <Target className="w-5 h-5 text-primary-500" />
              </div>
            ))}
          </div>
        </BentoCard>
      </BentoGrid>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-6 text-center">
          <Heart className="w-12 h-12 mx-auto text-primary-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Log Health</h3>
          <p className="text-text-secondary mb-4">Record your daily health metrics</p>
          <button className="px-4 py-2 bg-primary-500/20 text-primary-500 rounded-lg hover:bg-primary-500/30 transition-colors">Log Now</button>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <Apple className="w-12 h-12 mx-auto text-primary-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Track Meals</h3>
          <p className="text-text-secondary mb-4">Add your daily meals and snacks</p>
          <button className="px-4 py-2 bg-primary-500/20 text-primary-500 rounded-lg hover:bg-primary-500/30 transition-colors">Add Meal</button>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <Dumbbell className="w-12 h-12 mx-auto text-primary-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Workout</h3>
          <p className="text-text-secondary mb-4">Log your exercise sessions</p>
          <button className="px-4 py-2 bg-primary-500/20 text-primary-500 rounded-lg hover:bg-primary-500/30 transition-colors">Start Workout</button>
        </GlassCard>
      </div>
    </div>
  )
}
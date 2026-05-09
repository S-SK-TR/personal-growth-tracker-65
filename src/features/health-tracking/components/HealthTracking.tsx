import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useStore } from '@/core/hooks/useStore'
import { GlassCard } from '@/components/ui/GlassCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

const measurementSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  weight: z.number().min(30, 'Weight must be at least 30kg').max(200, 'Weight must be less than 200kg'),
  height: z.number().min(100, 'Height must be at least 100cm').max(250, 'Height must be less than 250cm'),
  bmi: z.number().optional()
})

type MeasurementFormData = z.infer<typeof measurementSchema>

export function HealthTracking() {
  const { measurements, addMeasurement, updateMeasurement, deleteMeasurement } = useStore()
  const [editingDate, setEditingDate] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MeasurementFormData>({
    resolver: zodResolver(measurementSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      weight: 70,
      height: 170
    }
  })

  const onSubmit = (data: MeasurementFormData) => {
    const bmi = data.weight / Math.pow(data.height / 100, 2)
    const measurementWithBmi = { ...data, bmi }

    if (editingDate) {
      updateMeasurement(editingDate, measurementWithBmi)
      setEditingDate(null)
    } else {
      addMeasurement(measurementWithBmi)
    }
    reset()
  }

  const handleEdit = (measurement: MeasurementFormData) => {
    setEditingDate(measurement.date)
    reset(measurement)
  }

  const chartData = measurements.map(measurement => ({
    date: format(new Date(measurement.date), 'MMM dd'),
    weight: measurement.weight,
    bmi: measurement.bmi
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Health Tracking</h1>

      {/* Chart */}
      {measurements.length > 0 && (
        <GlassCard className="p-4">
          <h2 className="text-xl font-medium mb-4">Weight Progress</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis yAxisId="left" orientation="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="bmi" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      )}

      {/* Form */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-medium mb-4">{editingDate ? 'Edit Measurement' : 'Add New Measurement'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text-secondary mb-1">Date</label>
            <input
              id="date"
              type="date"
              {...register('date')}
              className="w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>}
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-text-secondary mb-1">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              step="0.1"
              {...register('weight', { valueAsNumber: true })}
              className="w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight.message}</p>}
          </div>

          <div>
            <label htmlFor="height" className="block text-sm font-medium text-text-secondary mb-1">Height (cm)</label>
            <input
              id="height"
              type="number"
              {...register('height', { valueAsNumber: true })}
              className="w-full px-3 py-2 bg-surface/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height.message}</p>}
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              {editingDate ? 'Update' : 'Add'}
            </button>
            {editingDate && (
              <button
                type="button"
                onClick={() => {
                  reset()
                  setEditingDate(null)
                }}
                className="px-4 py-2 bg-surface/50 text-text-secondary rounded-lg hover:bg-surface/70 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </GlassCard>

      {/* Measurements List */}
      {measurements.length > 0 ? (
        <GlassCard className="p-6">
          <h2 className="text-xl font-medium mb-4">Measurement History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Weight (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Height (cm)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">BMI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {measurements.map((measurement) => (
                  <tr key={measurement.date} className="hover:bg-surface/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                      {format(new Date(measurement.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{measurement.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{measurement.height}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">{measurement.bmi?.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                      <button
                        onClick={() => handleEdit(measurement)}
                        className="text-primary-500 hover:text-primary-400 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMeasurement(measurement.date)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="p-6 text-center">
          <p className="text-text-secondary">No measurements recorded yet. Add your first measurement to start tracking your progress.</p>
        </GlassCard>
      )}
    </div>
  )
}
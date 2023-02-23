// type imports
import type { FC } from 'react'

// named imports
import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const TimeChart: FC<TimeChartData> = ({ type, data }) => {
  // extract labels from severity values passed
  const labels = useMemo(() => data?.map((d) => {
    switch (d.severity) {
      case 1:
        return 'TRACE'
      case 2:
        return 'DEBUG'
      case 3:
        return 'INFO'
      case 4:
        return 'WARN'
      case 5:
        return 'ERROR'
      case 6:
        return 'FATAL'
      default:
        return 'TRACE'
    }
  }), [data])

  // extract colors from severity values passed
  const bgColors = useMemo(() => data?.map((d) => {
    switch (d.severity) {
      case 1:
        return '#d1d5db'
      case 2:
        return '#9ca3af'
      case 3:
        return '#38bdf8'
      case 4:
        return '#fde047'
      case 5:
        return '#fca5a5'
      case 6:
        return '#f43f5e'
      default:
        return '#d1d5db'
    }
  }), [data])

  // extract values from the data passed
  const values = useMemo(() => data?.map((d) => d.count), [data])

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Logs',
        data: values,
        backgroundColor: bgColors,
        borderWidth: 2,
      },
    ],
  }), [labels, values, bgColors])

  return (
    <div className='border-2 shadow-lg px-3 rounded-2xl relative bg-white dark:bg-slate-700'>
      <h3 className='text-lg mb-5 absolute right-4 top-2 text-gray-500 dark:text-gray-200'>
        Logs created {type === 'daily' ? 'today' : type === 'weekly' ? 'this week' : 'this month'}
      </h3>

      <Doughnut
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: 'right' as const,
              labels: {
                color: '#a1a1aa',
                font: {
                  weight: 'semibold',
                }
              }
            },
          },
        }}
      />
    </div>
  )
}

export default TimeChart

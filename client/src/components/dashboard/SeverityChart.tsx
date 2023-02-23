// type imports
import type { FC } from 'react'

// named imports
import { useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface SeverityChartProps {
  data: SeverityChartData[]
}

const SeverityChart: FC<SeverityChartProps> = ({ data }) => {
  // extract labels, values, background colors and border colors from data passed
  const labels = useMemo(() => data.map((d) => {
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

  const bgColors = useMemo(() => data.map((d) => {
    switch (d.severity) {
      case 1:
        return '#d1d5dbdd'
      case 2:
        return '#9ca3afdd'
      case 3:
        return '#38bdf8dd'
      case 4:
        return '#fde047dd'
      case 5:
        return '#fca5a5dd'
      case 6:
        return '#f43f5edd'
      default:
        return '#d1d5dbdd'
    }
  }), [data])

  const values = useMemo(() => data.map((d) => d.count), [data])

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Log Count',
        data: values,
        backgroundColor: bgColors,
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className='shadow-lg rounded-2xl p-10 pt-16 border-4 border-emerald-400 dark:border-indigo-400 bg-white dark:bg-slate-700 flex flex-col items-center justify-center relative'>
      <h3 className='text-lg absolute right-6 top-3 text-gray-500 dark:text-gray-200'>
        Logs by Severity
      </h3>

      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: 'bottom' as const,
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

export default SeverityChart

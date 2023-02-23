// type imports
import type { FC, MouseEvent } from 'react'

// named imports
import { useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

interface AnnualChartProps {
  data: AnnualChartData[]
}

const AnnualChart: FC<AnnualChartProps> = ({ data }) => {
  // extract labels and values from data passed
  const labels = useMemo(() => data.map((d) => d.date), [data]) 
  const values = useMemo(() => [...data.map((d) => d.count), 0], [data]) // adding 0 at the end to get a base reference value (elevating the graph)

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        fill: true,
        label: 'Logs',
        data: values,
        borderColor: '#fb923c',
        backgroundColor: '#fb923c99',
      },
    ],
  }), [labels, values])

  return (
    <div className='shadow-lg rounded-2xl p-5 mx-5 border-4 border-emerald-400 dark:border-indigo-400 bg-white dark:bg-slate-700 flex flex-col items-center justify-center'>
      <h3 className='text-lg mb-4 text-center text-gray-500 dark:text-gray-200'>
        Logs created over time
      </h3>

      <Line
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: '#9ca3af',
              },
              ticks: {
                color: '#9ca3af',
              }
            },
            y: {
              grid: {
                color: '#9ca3af',
              },
              ticks: {
                color: '#9ca3af',
              }
            },
          }
        }}
      />
    </div>
  )
}

export default AnnualChart

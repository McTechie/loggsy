// type imports
import type { FC, MouseEvent } from 'react'

// named imports
import { useState, useEffect, useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

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

const severities = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']

const AnnualChart: FC<AnnualChartData> = ({ sources, data }) => {
  // states to store data for dropdowns
  const [parameterType, setParameterType] = useState<'severity' | 'source'>('severity')
  const [parameterValue, setParameterValue] = useState<string>(severities[0])

  // states to store options for parameter values
  const [options, setOptions] = useState<string[]>([])
  
  // state to store current data to be displayed
  const [currentData, setCurrentData] = useState<{ date: string; count: number }[]>(data)

  // extract labels and values from data passed
  const labels = useMemo(() => currentData.map((d) => d.date), [currentData]) 
  const values = useMemo(() => [...currentData.map((d) => d.count), 0], [currentData]) // adding 0 at the end to get a base reference value (elevating the graph)

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

  // set options and parameter values based on parameter type
  useEffect(() => {
    if (parameterType === 'severity') {
      setOptions(severities)
      setParameterValue(severities[0])
    } else {
      setOptions(sources)
      setParameterValue(sources[0])
    }
  }, [parameterType, sources])

  // fetch new data handler function
  const fetchData = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // prevent default behaviour of button
    
    console.log(parameterType, parameterValue)

    // TODO: fetch data from API and set it to currentData
    setCurrentData([
      {
        date: '2021-01-01',
        count: 10,
      },
      {
        date: '2021-01-02',
        count: 20,
      },
      {
        date: '2021-01-03',
        count: 30,
      },
      {
        date: '2021-01-04',
        count: 20,
      },
      {
        date: '2021-01-05',
        count: 10,
      },
      {
        date: '2021-01-06',
        count: 20,
      },
      {
        date: '2021-01-07',
        count: 20,
      },
      {
        date: '2021-01-08',
        count: 30,
      },
      {
        date: '2021-01-09',
        count: 20,
      },
      {
        date: '2021-01-10',
        count: 10,
      },
      {
        date: '2021-01-11',
        count: 20,
      },
    ])
  }

  return (
    <div className='shadow-lg rounded-2xl p-10 m-10 -mt-0 -mx-0 border-4 border-emerald-400 dark:border-indigo-400 bg-white dark:bg-slate-700 flex flex-col items-center justify-center relative'>
      <h3 className='text-lg mb-5 absolute right-6 top-3 text-gray-500 dark:text-gray-200'>
        Filter Logs
      </h3>

      {/* dropdowns to change parameters */}
      <div className='grid grid-cols-4 gap-x-4 items-center pb-6 w-full'>
        {/* first dropdown to select type of parameter (severity or source) */}
        <select
          name='parameterType'
          id='parameterType'
          onChange={(e) => setParameterType(e.target.value as ('severity' | 'source'))}
          className='border-[3px] border-emerald-400 dark:border-indigo-400 dark:bg-transparent rounded-full p-2'
        >
          <option value='severity'>Severity</option>
          <option value='source'>Source</option>
        </select>

        {/* second dropdown to select value of parameter (eg: INFO for Severity or Server for Source) */}
        <select
          name='type'
          id='type'
          onChange={(e) => setParameterValue(e.target.value)}
          className='border-[3px] border-emerald-400 dark:border-indigo-400 dark:bg-transparent rounded-full p-2'
        >
          {options.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <div>
          <button
            onClick={fetchData}
            className='bg-emerald-400 dark:bg-indigo-400 hover:bg-emerald-500 dark:hover:bg-indigo-500 rounded-full p-2'
          >
            <ArrowPathIcon className='h-6 w-6' />
          </button>
        </div>
      </div>
        
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

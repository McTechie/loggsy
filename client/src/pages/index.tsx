// type imports
import type { GetServerSideProps, NextPage } from 'next'

// named imports
import { useMemo } from 'react'

// named imports
import { AnnualChart, SeverityChart, TimeChart } from '../components'

interface DashboardProps {
  overviewData: TimeChartData[],
  annualData: AnnualChartData,
  severityData: SeverityChartData[]
}

const Dashboard: NextPage<DashboardProps> = ({ overviewData, annualData, severityData }) => {
  // selecting appropriate logs data for doughnut charts
  const dailyData = useMemo(() => overviewData.find((d: any) => d.type === 'daily'), [overviewData])!
  const weeklyData = useMemo(() => overviewData.find((d: any) => d.type === 'weekly'), [overviewData])!
  const monthlyData  = useMemo(() => overviewData.find((d: any) => d.type === 'monthly'), [overviewData])!

  return (
    <div>
      <section className='max-w-screen-xl mx-auto mt-4 mb-10 border-2 shadow-xl px-10 pb-10 rounded-2xl bg-emerald-400 dark:bg-indigo-400'>
        <h2 className='text-2xl pt-6 pb-4 uppercase font-semibold dark:text-gray-100'>
          Summary
        </h2>

        <div className='grid grid-cols-6 gap-x-10'>
          <div className='col-span-2'>
            <TimeChart {...dailyData} />
          </div>
          <div className='col-span-2'>
            <TimeChart {...weeklyData} />
          </div>
          <div className='col-span-2'>
            <TimeChart {...monthlyData} />
          </div>
        </div>
      </section>

      <section className='max-w-screen-xl mx-auto mt-4 mb-10'>
        <div className='grid grid-cols-6 gap-x-10'>
          <div className='col-span-4'>
            <AnnualChart {...annualData} />
          </div>
          <div className='col-span-2'>
            <SeverityChart data={severityData} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async () => {
  const data = {
    overviewData: [
      {
        type: 'daily',
        data: [
          {
            severity: 1,
            count: 3
          },
          {
            severity: 2,
            count: 7
          }
        ]
      },
      {
        type: 'weekly',
        data: [
          {
            severity: 4,
            count: 10
          },
          {
            severity: 6,
            count: 20
          },
          {
            severity: 3,
            count: 30
          }
        ]
      },
      {
        type: 'monthly',
        data: [
          {
            severity: 1,
            count: 3
          },
          {
            severity: 2,
            count: 7
          },
          {
            severity: 3,
            count: 10
          },
          {
            severity: 4,
            count: 2
          },
          {
            severity: 5,
            count: 3
          },
          {
            severity: 6,
            count: 4
          }
        ]
      }
    ],
    annualData: {
      sources: ['app', 'server', 'database'],
      data: [
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
        }
      ]
    },
    severityData: [
      {
        severity: 1,
        count: 10,
      },
      {
        severity: 2,
        count: 20,
      },
      {
        severity: 3,
        count: 30,
      },
      {
        severity: 4,
        count: 20,
      },
      {
        severity: 5,
        count: 10,
      },
      {
        severity: 6,
        count: 20,
      }
    ]
  }

  const { overviewData, annualData, severityData } = data

  return {
    props: {
      overviewData,
      annualData,
      severityData
    },
  }
}

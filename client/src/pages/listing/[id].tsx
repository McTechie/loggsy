// type imports
import type { NextPage } from 'next'

// named imports
import { useRouter } from 'next/navigation'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { ModifyLogForm } from '../../components'

interface LogDetailsPageProps {
  logData: Log
}

const LogDetails: NextPage<LogDetailsPageProps> = ({ logData }) => {
  const router = useRouter()

  return (
    <div className='max-w-screen-xl mx-auto'>
      <button
        onClick={() => router.back()}
        className='text-xs flex items-center space-x-1 group hover:text-orange-400 dark:hover:text-sky-300'
      >
        <ChevronDoubleLeftIcon className='inline-block w-4 h-4' />
        <span className='group-hover:pl-[0.15rem] transition-all ease-in-out duration-200'>Back</span>
      </button>

      <h2 className='text-2xl text-center font-semibold mt-2 mb-6'>
        Log Details
      </h2>

      <ModifyLogForm
        logData={logData}
      />
    </div>
  )
}

export default LogDetails

export const getServerSideProps = async (context: { params: { id: string } }) => {
  // mock data
  // const logData: Log = {
  //   id: '1',
  //   timestamp: 1672531200000,
  //   severity: 1,
  //   source: 'Server',
  //   message: 'This is a log message',
  // }

  const { id } = context.params // get id from url

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/log/${id}`)

  const logData = await res.json()

  return {
    props: {
      logData,
    },
  }
}


// type imports
import type { NextPage } from 'next'

// named imports
import { useRouter } from 'next/navigation'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'

const LogDetails: NextPage = () => {
  const router = useRouter()

  return (
    <div className='max-w-screen-xl mx-auto'>
      <button
        onClick={() => router.back()}
        className='text-xs flex items-center space-x-1 group hover:text-sky-300'
      >
        <ChevronDoubleLeftIcon className='inline-block w-4 h-4' />
        <span className='group-hover:pl-[0.15rem] transition-all ease-in-out duration-200'>Back</span>
      </button>
      <h2 className='text-2xl text-center font-semibold mb-4'>
        Log Details
      </h2>
    </div>
  )
}

export default LogDetails

// type imports
import type { NextPage } from 'next'

// named imports
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { CreateLogForm, LogsInfo } from '../components'

// default imports
import toast from 'react-hot-toast'

const CreateLog: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const infoToast = toast((t) => <LogsInfo id={t.id} />, {
      position: 'bottom-right',
      duration: 6000,
      style: {
        maxWidth: '1280px',
        background: '#4b5563',
        color: '#d1d5db',
      }
    })

    return () => {
      // removing toast message on unmount
      toast.dismiss(infoToast)
    }
  }, [])

  return (
    <div className='max-w-screen-xl mx-auto'>
      {/* Information section */}
      <Toaster />

      {/* Log creation section */}
      <CreateLogForm router={router} />
    </div>
  )
}

export default CreateLog

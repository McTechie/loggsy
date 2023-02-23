// type imports
import type { FC } from 'react'

// named imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-hot-toast'

interface ModifyLogFormProps {
  logData: Log
}

const ModifyLogForm: FC<ModifyLogFormProps> = ({ logData }) => {
  const router = useRouter()

  const { register, setValue, handleSubmit, formState: { errors, touchedFields } } = useForm<Log>()

  // loading states
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleUpdateLog = async (data: Log) => {
    // do not try to modify log if no fields were touched
    if (Object.keys(touchedFields).length === 0) return

    setIsUpdating(true)

    // create new log object with the modified fields
    const modifiedLog = {
      ...data,
      timestamp: logData.timestamp,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/log/${logData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedLog),
    })

    const resData = await res.json()

    if (res.status === 200) {
      toast.success('Log Updated Successfully', {
        position: 'bottom-right',
        duration: 5000,
        style: {
          maxWidth: '1280px',
          background: '#4b5563',
          color: '#d1d5db',
        }
      })

      setIsUpdating(false)

      router.push('/listing')
    } else {
      toast.error(`Oops... ${resData.message}`, {
        position: 'bottom-right',
        duration: 5000,
        style: {
          maxWidth: '1280px',
          background: '#4b5563',
          color: '#d1d5db',
        }
      })

      setIsUpdating(false)
    }
  }

  const handleDeleteLog = async () => {
    setIsDeleting(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/log/${logData.id}`, {
      method: 'DELETE',
    })

    const resData = await res.json()

    if (res.status === 200) {
      toast.success('Log Deleted Successfully', {
        position: 'bottom-right',
        duration: 5000,
        style: {
          maxWidth: '1280px',
          background: '#4b5563',
          color: '#d1d5db',
        }
      })

      setIsDeleting(false)
      
      router.push('/listing')
    } else {
      toast.error(`Oops... ${resData.message}`, {
        position: 'bottom-right',
        duration: 5000,
        style: {
          maxWidth: '1280px',
          background: '#4b5563',
          color: '#d1d5db',
        }
      })

      setIsDeleting(false)
    }
  }

  useEffect(() => {
    // set values for all the editable fields
    setValue('severity', logData.severity)
    setValue('source', logData.source)
    setValue('message', logData.message)
  }, [logData, setValue])

  return (
    <section className='max-w-screen-sm mx-auto'>
      <form
        className='relative flex flex-col space-y-10 px-16 pt-10 rounded-2xl bg-emerald-200 dark:bg-slate-800'
        onSubmit={handleSubmit(handleUpdateLog)}
      >
        <button
          type='button'
          onClick={handleDeleteLog}
          className={`absolute right-5 top-5 p-1 rounded-full bg-emerald-500 dark:bg-indigo-500 opacity-80 hover:opacity-100 ${isDeleting && 'animate-spin'}`}
        >
          <TrashIcon className='w-7 h-7 text-rose-500 bg-white p-1 rounded-full transition-all duration-300 ease-in-out' />
        </button>
        
        <div className='flex justify-between items-center'>
          <label htmlFor='logId' className='form-label'>
            Log ID:
          </label>
          <input
            type='text'
            id='logId'
            value={logData.id} // set value for the log id
            disabled={true}
            className='form-input disabled:bg-gray-400 disabled:text-white cursor-not-allowed'
          />
        </div>

        <div className='flex justify-between items-center'>
          <label htmlFor='timestamp' className='form-label'>
            Timestamp of the Log:
          </label>
          <input
            type='text'
            id='timestamp'
            value={new Date(logData.timestamp).toISOString()} // set value for the timestamp
            disabled={true}
            className='form-input disabled:bg-gray-400 disabled:text-white cursor-not-allowed'
          />
        </div>

        <div>
          <div className='flex justify-between items-center'>
            <label htmlFor='source' className='form-label'>
              Source of the Log:
            </label>
            <input
              type='text'
              id='source'
              placeholder='Eg. Server'
              className={`form-input ${errors.source && 'form-input-error'}`}
              {...register('source', { required: true })}
            />
          </div>
          <p className='flex justify-end pt-1'>
            <span className='text-xs text-rose-500 dark:text-rose-400'>
              {errors.source?.type === 'required' && 'Please enter a Log Message'}
            </span>
          </p>
        </div>

        <div>
          <div className='flex justify-between items-center'>
            <label htmlFor='severity' className='form-label'>
              Severity of the Log:
            </label>
            <select
              id='severity'
              className={`form-input ${errors.severity && 'form-input-error'}`}
              {...register('severity', { required: true, valueAsNumber: true })}
            >
              <option value={1}>TRACE</option>
              <option value={2}>DEBUG</option>
              <option value={3}>INFO</option>
              <option value={4}>WARN</option>
              <option value={5}>ERROR</option>
              <option value={6}>FATAL</option>
            </select>
          </div>
          <p className='flex justify-end pt-1'>
            <span className='text-xs text-rose-500 dark:text-rose-400'>
              {errors.severity?.type === 'required' && 'Please select a Severity'}
            </span>
          </p>
        </div>

        <div>
          <div className='flex justify-between items-center'>
            <label htmlFor='message' className='form-label'>
              Message shown:
            </label>
            <textarea
              rows={3}
              id='message'
              placeholder='Log message here'
              className={`form-input ${errors.message && 'form-input-error'} rounded-xl`}
              {...register('message', { required: true, minLength: 10, maxLength: 200 })}
            />
          </div>
          <p className='flex justify-end pt-1'>
            <span className='text-xs text-rose-500 dark:text-rose-400'>
              {errors.message?.type === 'required' && 'Please enter a Log Message'}
              {errors.message?.type === 'minLength' && 'Almost there... Log Message is too short'}
              {errors.message?.type === 'maxLength' && 'Woah... Log Message is too long'}
            </span>
          </p>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className={`cta-btn flex items-center ${isUpdating && 'opacity-90 cursor-not-allowed'}`}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' stroke-width='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                <span>Modifying...</span>
              </> 
              ) : (
                <span>Modify Log</span>
              )}
          </button>
        </div>

        <div role='none' className='rectangle'></div>
      </form>
    </section>
  )
}

export default ModifyLogForm

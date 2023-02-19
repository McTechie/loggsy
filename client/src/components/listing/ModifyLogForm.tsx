// type imports
import type { FC } from 'react'

// named imports
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TrashIcon } from '@heroicons/react/24/solid'

interface ModifyLogFormProps {
  logData: Log
}

const ModifyLogForm: FC<ModifyLogFormProps> = ({ logData }) => {
  const { register, setValue, handleSubmit, formState: { errors, touchedFields } } = useForm<Log>()

  const submitData = (data: Log) => {
    // do not try to modify log if no fields were touched
    if (Object.keys(touchedFields).length === 0) return

    // create new log object with the modified fields
    const modifiedLog = {
      ...data,
      id: logData.id,
      timestamp: logData.timestamp,
    }

    console.log('Modified log: ', modifiedLog)
  }

  const handleDeleteLog = () => {
    console.log('Deleting log with id: ', logData.id)
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
        onSubmit={handleSubmit(submitData)}
      >
        <button
          type='button'
          onClick={handleDeleteLog}
          className='absolute right-5 top-5 p-1 rounded-full bg-emerald-500 dark:bg-indigo-500 opacity-80 hover:opacity-100 rotate-[16deg] group'
        >
          <TrashIcon className='w-7 h-7 text-rose-500 bg-white p-1 rounded-full group-hover:-rotate-[16deg] transition-all duration-300 ease-in-out' />
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
            value={new Date(logData.timestamp).toUTCString()} // set value for the timestamp
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
            className='cta-btn'
          >
            Modify Log
          </button>
        </div>

        <div role='none' className='rectangle'></div>
      </form>
    </section>
  )
}

export default ModifyLogForm

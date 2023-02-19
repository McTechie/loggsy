// named imports
import { useForm } from 'react-hook-form'

const CreateLogForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Log>()

  const submitData = (data: Log) => {
    console.log(data)
  }

  return (
    <section className='max-w-screen-sm mx-auto'>
      <h2 className='text-2xl text-center font-semibold mb-4'>
        Create a Log
      </h2>
      <form
        className='flex flex-col space-y-10 px-16 pt-10 rounded-2xl bg-emerald-200 dark:bg-slate-800'
        onSubmit={handleSubmit(submitData)}
      >
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
            <label htmlFor='timestamp' className='form-label'>
              Timestamp of the Log:
            </label>
            <input
              type='datetime-local'
              id='timestamp'
              className={`form-input ${errors.timestamp && 'form-input-error'}`}
              {...register('timestamp', { required: true })}
            />
          </div>
          <p className='flex justify-end pt-1'>
            <span className='text-xs text-rose-500 dark:text-rose-400'>
              {errors.timestamp?.type === 'required' && 'Please select a Timestamp'}
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
            className='form-submit'
          >
            Create Log
          </button>
        </div>

        <div role='none' className='rectangle'></div>
      </form>
    </section>
  )
}

export default CreateLogForm

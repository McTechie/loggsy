// type imports
import { FC } from 'react'

// named imports
import { SubmitHandler, useForm } from 'react-hook-form'

// default imports
import SeverityBadge from './SeverityBadge'

interface ListingTableProps {
  logs: Log[]
}

interface FormData {
  dateFrom: string,
  dateTo: string,
  severity: number,
  source: string
}

const ListingTable: FC<ListingTableProps> = ({ logs }) => {
  const { register, handleSubmit } = useForm<FormData>()

  const submitData: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  return (
    <div className='w-full'>
      {/* Filter Form */}
      <form
        onSubmit={handleSubmit(submitData)}
        className='grid grid-cols-4 items-center lg:grid-cols-9 gap-2 py-3 px-4 mt-6 mb-10 rounded-full bg-emerald-400 dark:bg-indigo-400'
      >
        <div className='ml-2 space-x-2 col-span-2'>
          <label
            htmlFor='dateFrom'
            className='form-label'
          >
            From:
          </label>
          <input
            type='date'
            id='dateFrom'
            placeholder='Date From'
            {...register('dateFrom')}
            className='form-input'
          />
        </div>

        <div className='space-x-2 col-span-2'>
          <label
            htmlFor='dateTo'
            className='form-label'
          >
            To:
          </label>
          <input
            type='date'
            id='dateTo'
            placeholder='Date To'
            {...register('dateTo')}
            className='form-input'
          />
        </div>

        <div className='space-x-2 col-span-2'>
          <label
            htmlFor='severity'
            className='form-label'
          >
            Severity:
          </label>
          <select
            id='severity'
            {...register('severity')}
            className='form-input'
          >
            <option value={1}>TRACE</option>
            <option value={2}>DEBUG</option>
            <option value={3}>INFO</option>
            <option value={4}>WARN</option>
            <option value={5}>ERROR</option>
            <option value={6}>FATAL</option>
          </select>
        </div>

        <div className='space-x-2 col-span-2'>
          <label
            htmlFor='source'
            className='form-label'
          >
            Source:
          </label>
          <input
            type='text'
            id='source'
            placeholder='Eg. Server'
            {...register('source')}
            className='form-input'
          />
        </div>

        <div>
          <button
            type='submit'
            className='form-submit'
          >
            Apply Filter
          </button>
        </div>
      </form>

      {/* Table */}
      <table className='w-full table-fixed text-center'>
        <thead>
          <tr className='table-header-row'>
            <th>Timestamp</th>
            <th>Severity</th>
            <th>Source</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs ? logs.length > 0 ? logs.map((log) => (
            <tr
              key={log.id}
              className='table-body-row'
            >
              <td>{log.timestamp}</td>
              <td>
                <SeverityBadge severity={log.severity} />
              </td>
              <td>{log.source}</td>
              <td>{log.message.length > 30 ? `${log.message.substring(0, 30)}...` : log.message}</td>
            </tr>
          )) : (
            <tr>
              <td className='pt-3 text-sm' colSpan={4}>No logs found...</td>
            </tr>
          ) : (
            <tr>
              <td className='pt-3 text-sm' colSpan={4}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ListingTable

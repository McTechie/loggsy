// type & named imports
import { FC, useState } from 'react'

// named imports
import { SubmitHandler, useForm } from 'react-hook-form'

// default imports
import SeverityBadge from './SeverityBadge'

interface ListingTableProps {
  logs: Log[]
}

interface FormData {
  fromDate: string,
  toDate: string,
  severity: number,
  source: string
}

const ListingTable: FC<ListingTableProps> = ({ logs }) => {
  const { register, handleSubmit } = useForm<FormData>()

  const [filteredLogs, setFilteredLogs] = useState<Log[]>(logs)

  const submitData: SubmitHandler<FormData> = (data) => {
    const { fromDate, toDate, severity, source } = data

    const newlyFilteredLogs = logs.filter(log => {
      let flag = true

      // Filtering Cases
      // ----------------
      // Case #1:
      //   If the source is not empty AND
      //   the input source does not include the log source AND
      //   the log source does not include the input source, then set the flag to FALSE
      // Case #2:
      //   If the severity is not 0 AND
      //   the input severity does not match the log severity, then set the flag to FALSE
      // Case #3:
      //   If the from date is not empty AND
      //   the log timestamp is less than the from date, then set the flag to FALSE
      // Case #4:
      //   If the to date is not empty AND
      //   the log timestamp is greater than the to date, then set the flag to FALSE

      if (source && !log.source.toLowerCase().includes(source.toLowerCase()) && !source.toLowerCase().includes(log.source.toLowerCase())) {
        flag = false
      } else if (severity !== 0 && log.severity !== severity) {
        flag = false
      } else if (fromDate && log.timestamp < new Date(fromDate).getTime()) {
        flag = false
      } else if (toDate && log.timestamp > new Date(toDate).getTime()) {
        flag = false
      }

      return flag
    })

    setFilteredLogs(newlyFilteredLogs)
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
            htmlFor='fromDate'
            className='form-label'
          >
            From:
          </label>
          <input
            type='date'
            id='fromDate'
            placeholder='Date From'
            {...register('fromDate')}
            className='form-input'
          />
        </div>

        <div className='space-x-2 col-span-2'>
          <label
            htmlFor='toDate'
            className='form-label'
          >
            To:
          </label>
          <input
            type='date'
            id='toDate'
            placeholder='Date To'
            {...register('toDate')}
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
            {...register('severity', { valueAsNumber: true })}
            className='form-input'
          >
            <option value={0}>ALL</option>
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

        <div className='col-span-1'>
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
          {filteredLogs ? filteredLogs.length > 0 ? filteredLogs.map((log) => (
            <tr
              key={log.id}
              className='table-body-row'
            >
              <td>
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td>
                <SeverityBadge severity={log.severity} />
              </td>
              <td>
                {log.source}
              </td>
              <td>
                {log.message.length > 30 ? `${log.message.substring(0, 30)}...` : log.message}
              </td>
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

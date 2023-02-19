// type imports
import { FC, MouseEvent } from 'react'

// named imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { ArrowDownCircleIcon, ArrowUpCircleIcon, ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

// default imports
import toast from 'react-hot-toast'
import SeverityBadge from './SeverityBadge'

interface ListingProps {
  logs: Log[]
}

const Listing: FC<ListingProps> = ({ logs }) => {
  const router = useRouter() // next router

  const { register, handleSubmit } = useForm<FilterFormData>() // react-hook-form

  // pagination logic states
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [logsPerPage, setLogsPerPage] = useState<number>(8)

  // filtering logic state
  const [filteredLogs, setFilteredLogs] = useState<Log[]>(logs)

  // sorting logic states
  const [isSortedBySeverity, setIsSortedBySeverity] = useState<boolean>(false)
  const [isSortedBySource, setIsSortedBySource] = useState<boolean>(false)

  // sorting handler functions
  const handleSortBySeverity = () => {
    // Sorting Logic
    // -------------
    // Case #1:
    //   If the logs have already been sorted by severity, then sort them in descending order
    // Case #2:
    //   If the logs have not been sorted by severity, then sort them in ascending order

    let newlySortedLogs: Log[] = []

    if (isSortedBySeverity) {
      newlySortedLogs = filteredLogs.sort((a, b) => a.severity - b.severity)
    } else {
      newlySortedLogs = filteredLogs.sort((a, b) => b.severity - a.severity)
    }

    setFilteredLogs(newlySortedLogs)
    setIsSortedBySeverity(isSortedBySeverity => !isSortedBySeverity)
  }

  const handleSortBySource = () => {
    // Sorting Logic
    // -------------
    // Case #1:
    //   If the logs have already been sorted by source, then sort them in descending order
    // Case #2:
    //   If the logs have not been sorted by source, then sort them in ascending order

    let newlySortedLogs: Log[] = []

    if (isSortedBySource) {
      newlySortedLogs = filteredLogs.sort((a, b) => a.source.localeCompare(b.source))
    } else {
      newlySortedLogs = filteredLogs.sort((a, b) => b.source.localeCompare(a.source))
    }

    setFilteredLogs(newlySortedLogs)
    setIsSortedBySource(isSortedBySource => !isSortedBySource)
  }

  // pagination handler functions
  const handlePagination = (e: MouseEvent<HTMLButtonElement>, type: 'previous' | 'next') => {
    e.preventDefault() // prevent default behavior

    if (type === 'previous') {
      if (currentPage > 1) {
        setCurrentPage(currentPage => currentPage - 1)
      }
    } else {
      if (currentPage < Math.ceil(filteredLogs.length / logsPerPage)) {
        setCurrentPage(currentPage => currentPage + 1)
      }
    }
  }

  // filter handler function
  const filterData: SubmitHandler<FilterFormData> = (data) => {
    const notification = toast.loading('Filtering logs...', {
      style: {
        background: '#334155',
        color: '#d1d5db',
      },
    })

    const { fromDate, toDate, severity, source } = data

    // Filtering Logic
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

    const newlyFilteredLogs = logs.filter(log => {
      let flag = true

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

    // reset pagination
    setCurrentPage(1)

    // reset sorting
    setIsSortedBySeverity(false)
    setIsSortedBySource(false)

    toast.dismiss(notification)
    toast.success('Logs filtered successfully!', {
      style: {
        background: '#334155',
        color: '#d1d5db',
      },
    })
  }

  useEffect(() => {
    const infoToast = toast((t) => (
      <div>
        <div className='border-b-2 pb-1 mb-2 flex justify-between'>
          <p className='font-semibold flex items-center space-x-1'>
            <InformationCircleIcon className='inline-block w-5 h-5' />
            <span>Loggsy Listings</span>
          </p>
          <button onClick={() => toast.dismiss(t.id)}>
            <XMarkIcon className='inline-block w-5 h-5' />
          </button>
        </div>
        
        <ol className='text-xs pt-2 pl-1 list-decimal'>
          <li><b>Filter logs</b> by severity, source, and date range!</li>
          <li><b>Sort logs</b> by severity and source!</li>
          <li>View logs in a <b>paginated format</b>!</li>
          <li>Click on a log to view its <b>details</b>!</li>
        </ol>
      </div>
    ), {
      duration: 8000,
      style: {
        background: '#4b5563',
        color: '#d1d5db',
      },
    })

    return () => {
      // removing toast message on unmount
      toast.dismiss(infoToast)
    }
  }, [])

  return (
    <div className='w-full'>
      <Toaster
        position='bottom-right'
        reverseOrder={false}
      />

      {/* Filter Form */}
      <section>
        <form
          onSubmit={handleSubmit(filterData)}
          className='grid grid-cols-4 items-center lg:grid-cols-9 gap-2 py-3 px-4 mt-6 rounded-full bg-emerald-400 dark:bg-indigo-400'
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
      </section>

      {/* Logs Count */}
      <section className='my-4'>
        <p className='text-center text-xs text-gray-500 dark:text-gray-300'>
          Result: {filteredLogs.length} logs
        </p>
      </section>

      {/* Table */}
      {filteredLogs.length > 0 && (
        <section>
          <table className='w-full table-fixed text-center'>
            <thead>
              <tr className='table-header-row'>
                <th>Timestamp</th>
                <th>
                  <div className='flex items-center justify-center relative'>
                    <p>Severity</p>
                    <button
                      type='button'
                      onClick={handleSortBySeverity}
                      className='absolute right-5'
                    >
                      {isSortedBySeverity ? (
                        <ArrowUpCircleIcon className='w-5 h-5' />
                      ) : (
                        <ArrowDownCircleIcon className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </th>
                <th>
                  <div className='flex items-center justify-center relative'>
                    <p>Source</p>
                    <button
                      type='button'
                      onClick={handleSortBySource}
                      className='absolute right-5'
                    >
                      {isSortedBySource ? (
                        <ArrowUpCircleIcon className='w-5 h-5' />
                      ) : (
                        <ArrowDownCircleIcon className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage).map(log => (
                <tr
                  key={log.id}
                  className='table-body-row'
                  onClick={() => router.push(`/listing/${log.id}`)}
                >
                  <td>
                    {new Date(log.timestamp).toUTCString()}
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
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <section className='mt-7'>
          <p className='text-center text-xs text-gray-500 dark:text-gray-300 mb-12'>
            Showing page {currentPage} of {Math.ceil(filteredLogs.length / logsPerPage)}
          </p>

          <div className='flex items-center space-x-10 justify-center'>
            <button
              type='button'
              onClick={(e) => handlePagination(e, 'previous')}
              className='flex space-x-2 items-center p-2 pr-4 rounded-lg text-sm bg-emerald-400 dark:bg-indigo-400'
            >
              <ChevronLeftIcon className='w-4 h-4' />
              <span>Previous</span>
            </button>
            
            <div className='flex items-center'>
              <label
                htmlFor='paginationSize'
                className='text-sm text-gray-500 dark:text-gray-300'
              >
                Logs per page:
              </label>
              <select
                name='paginationSize'
                id='paginationSize'
                className='text-sm text-gray-500 dark:text-gray-300 ml-2 bg-emerald-400 dark:bg-indigo-400 rounded-md p-1'
                value={logsPerPage}
                onChange={(e) => setLogsPerPage(parseInt(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
              </select>
            </div>

            <button
              type='button'
              onClick={(e) => handlePagination(e, 'next')}
              className='flex space-x-2 items-center p-2 pl-4 rounded-lg text-sm bg-emerald-400 dark:bg-indigo-400'
            >
              <span>Next</span>
              <ChevronRightIcon className='w-4 h-4' />
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

export default Listing

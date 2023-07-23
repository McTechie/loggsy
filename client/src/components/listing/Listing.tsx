// type imports
import type { FC, MouseEvent } from 'react'

// named imports
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { ArrowDownCircleIcon, ArrowUpCircleIcon, ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

// default imports
import toast from 'react-hot-toast'
import CsvDownloadButton from 'react-json-to-csv'
import SeverityBadge from './SeverityBadge'

interface ListingProps {
  logs: Log[]
}

const Listing: FC<ListingProps> = ({ logs }) => {
  const router = useRouter() // next router

  const { register, handleSubmit } = useForm<FilterFormData>() // react-hook-form

  // get all the severities from the logs and avoid duplicates
  const severities = useMemo(() => Array.from(new Set(logs.map((log) => log.severity))), [logs])
  
  // get all the sources from the logs and avoid duplicates
  const sources = useMemo(() => Array.from(new Set(logs.map((log) => log.source))), [logs])

  // sorting logic states
  const [isSortedBySeverity, setIsSortedBySeverity] = useState<boolean>(false)
  const [isSortedBySource, setIsSortedBySource] = useState<boolean>(false)

  // pagination logic states
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [logsPerPage, setLogsPerPage] = useState<number>(8)

  // filtering logic state
  const [filteredLogs, setFilteredLogs] = useState<Log[]>(logs)

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
      newlySortedLogs = filteredLogs?.sort((a, b) => a.severity - b.severity)
    } else {
      newlySortedLogs = filteredLogs?.sort((a, b) => b.severity - a.severity)
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
      newlySortedLogs = filteredLogs?.sort((a, b) => a.source.localeCompare(b.source))
    } else {
      newlySortedLogs = filteredLogs?.sort((a, b) => b.source.localeCompare(a.source))
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
      if (currentPage < Math.ceil(filteredLogs?.length / logsPerPage)) {
        setCurrentPage(currentPage => currentPage + 1)
      }
    }
  }

  // filter handler function
  const handleFilterLogs: SubmitHandler<FilterFormData> = async (data) => {
    // if all the fields are empty, then return
    if (data.fromDate === '' && data.toDate === '' && data.source === '' && data.severity === 0) {
      setFilteredLogs(logs)

      // reset pagination
      setCurrentPage(1)

      // reset sorting
      setIsSortedBySeverity(false)
      setIsSortedBySource(false)

      return
    }

    const notification = toast.loading('Filtering logs...', {
      style: {
        background: '#334155',
        color: '#d1d5db',
      },
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logs/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date_from: data.fromDate,
        date_to: data.toDate,
        source: data.source,
        severity: data.severity,
      }),
    })
    
    if (res.status === 200) {
      const resData = await res.json()

      setFilteredLogs(resData)

      toast.dismiss(notification)
      toast.success('Logs filtered successfully!', {
        style: {
          background: '#334155',
          color: '#d1d5db',
        },
      })

      // reset pagination
      setCurrentPage(1)

      // reset sorting
      setIsSortedBySeverity(false)
      setIsSortedBySource(false)
    } else {
      toast.dismiss(notification)
      toast.error('An error occurred while filtering logs!', {
        style: {
          background: '#334155',
          color: '#d1d5db',
        },
      })
    }
  }

  // delete all logs handler function
  const handleDeleteAllLogs = async () => {
    const notification = toast.loading('Deleting logs...', {
      style: {
        background: '#334155',
        color: '#d1d5db',
      },
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logs/`, {
      method: 'DELETE',
    })

    if (res.status === 200) {
      toast.dismiss(notification)
      toast.success('Logs deleted successfully!', {
        style: {
          background: '#334155',
          color: '#d1d5db',
        },
      })

      router.refresh()
    } else {
      toast.dismiss(notification)
      toast.error('Something went wrong!', {
        style: {
          background: '#334155',
          color: '#d1d5db',
        },
      })
    }
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
          onSubmit={handleSubmit(handleFilterLogs)}
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
              <option value={0}>
                ALL
              </option>
              {severities.map((severity) => (
                <option key={severity} value={severity}>
                  {severity === 1 ? 'TRACE'
                    : severity === 2 ? 'DEBUG'
                    : severity === 3 ? 'INFO'
                    : severity === 4 ? 'WARN'
                    : severity === 5 ? 'ERROR'
                    : 'FATAL'
                  }
                </option>
              ))}
            </select>
          </div>

          <div className='space-x-2 col-span-2'>
            <label
              htmlFor='source'
              className='form-label'
            >
              Source:
            </label>
            <select
              id='source'
              {...register('source')}
              className='form-input'
            >
              <option value=''>
                ALL
              </option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div className='col-span-1'>
            <button
              type='submit'
              className='cta-btn'
            >
              Apply Filter
            </button>
          </div>
        </form>
      </section>

      {/* Logs Count and Download Section */}
      <section className='my-6 relative'>
        <p className='text-center text-xs text-gray-500 dark:text-gray-300'>
          Result: {filteredLogs?.length} logs
        </p>
        
        <div className='absolute right-6 -top-2 flex space-x-2'>
          <div className='w-fit cta-btn'>
            <CsvDownloadButton data={logs} />
          </div>

          <button
            type='button'
            onClick={handleDeleteAllLogs}
            className='cta-btn bg-rose-400 dark:bg-rose-400 hover:bg-rose-500 dark:hover:bg-rose-500'
          >
            Delete All Logs
          </button>
        </div>
      </section>

      {/* Table */}
      {filteredLogs?.length > 0 && (
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
              {filteredLogs?.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage).map(log => (
                <tr
                  key={log.id}
                  className='table-body-row'
                  onClick={() => router.push(`/listing/${log.id}`)}
                >
                  {/* <td>
                    {new Date(log.timestamp).toISOString()}
                  </td> */}
                  <td>
                    {new Date(log?.timestamp).toLocaleString() || 'N/A'}
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
      {filteredLogs?.length > 0 && (
        <section className='mt-7'>
          <p className='text-center text-xs text-gray-500 dark:text-gray-300 mb-12'>
            Showing page {currentPage} of {Math.ceil(filteredLogs?.length / logsPerPage)}
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

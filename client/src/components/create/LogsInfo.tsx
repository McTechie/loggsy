// type imports
import type { FC } from 'react'

// named imports
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

// default imports
import toast from 'react-hot-toast'
import SeverityBadge from '../listing/SeverityBadge'

interface LogsInfoProps {
  id: string
}

const LogsInfo: FC<LogsInfoProps> = ({ id }) => {
  return (
    <section className='max-w-screen-xl mx-auto'>
      <div className='border-b-2 pb-1 mb-2 flex justify-between'>
        <p className='font-semibold flex items-center space-x-1'>
          <InformationCircleIcon className='inline-block w-5 h-5' />
          <span>Loggsy Creations</span>
        </p>
        <button onClick={() => toast.dismiss(id)}>
          <XMarkIcon className='inline-block w-5 h-5' />
        </button>
      </div>
      
      <table className='table-fixed text-center'>
        <thead>
          <tr className='info-table-header-row'>
            <th>Severity</th>
            <td>
              <SeverityBadge severity={1} />
            </td>
            <td>
              <SeverityBadge severity={2} />
            </td>
            <td>
              <SeverityBadge severity={3} />
            </td>
            <td>
              <SeverityBadge severity={4} />
            </td>
            <td>
              <SeverityBadge severity={5} />
            </td>
            <td>
              <SeverityBadge severity={6} />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className='info-table-body-row'>
            <th>Description</th>
            <td>A fine-grained debugging message</td>
            <td>A debugging message</td>
            <td>An informational message</td>
            <td>A warning message</td>
            <td>An error message</td>
            <td>A fatal error message</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default LogsInfo

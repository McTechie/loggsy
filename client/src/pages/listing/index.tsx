// type imports
import type { GetServerSideProps, NextPage } from 'next'

// named imports
import { ListingTable } from '../../components'

interface ListingProps {
  logs: Log[]
}

const Listing: NextPage<ListingProps> = ({ logs }) => {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <h2 className='text-2xl text-center'>Log Listing</h2>

      <ListingTable
        logs={logs}
      />
    </div>
  )
}

export default Listing

export const getServerSideProps: GetServerSideProps = async () => {
  const logs: Log[] = [
    {
      id: '1',
      timestamp: '2023-01-01 00:00:00',
      severity: 1,
      source: 'Server',
      message: 'This is a log message',
    },
    {
      id: '2',
      timestamp: '2023-01-01 00:00:00',
      severity: 2,
      source: 'Server',
      message: 'This is a log message',
    },
    {
      id: '3',
      timestamp: '2023-01-01 00:00:00',
      severity: 5,
      source: 'Server',
      message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
    },
    {
      id: '4',
      timestamp: '2023-01-01 00:00:00',
      severity: 4,
      source: 'Server',
      message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
    },
    {
      id: '5',
      timestamp: '2023-01-01 00:00:00',
      severity: 3,
      source: 'Server',
      message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
    },
    {
      id: '6',
      timestamp: '2023-01-01 00:00:00',
      severity: 6,
      source: 'Server',
      message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
    }
  ]

  return {
    props: {
      logs,
    },
  }
}

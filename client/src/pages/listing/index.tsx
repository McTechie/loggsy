// type imports
import type { GetServerSideProps, NextPage } from 'next'

// named imports
import { Listing } from '../../components'

interface ListingPageProps {
  logs: Log[]
}

const ListingPage: NextPage<ListingPageProps> = ({ logs }) => {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <Listing logs={logs} />
    </div>
  )
}

export default ListingPage

export const getServerSideProps: GetServerSideProps = async () => {
  // mock data
  // const logs: Log[] = [
  //   {
  //     id: '1',
  //     timestamp: 1672531200000,
  //     severity: 1,
  //     source: 'Server',
  //     message: 'This is a log message',
  //   },
  //   {
  //     id: '2',
  //     timestamp: 1672531200000,
  //     severity: 2,
  //     source: 'Server',
  //     message: 'This is a log message',
  //   },
  //   {
  //     id: '3',
  //     timestamp: 1672531200000,
  //     severity: 5,
  //     source: 'Client',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '4',
  //     timestamp: 1672531200000,
  //     severity: 4,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '5',
  //     timestamp: 1672531200000,
  //     severity: 3,
  //     source: 'Service X',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '6',
  //     timestamp: 1672531200000,
  //     severity: 6,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '7',
  //     timestamp: 1672531200000,
  //     severity: 6,
  //     source: 'DB Instace Y',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '8',
  //     timestamp: 1672531200000,
  //     severity: 4,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '9',
  //     timestamp: 1672531200000,
  //     severity: 3,
  //     source: 'Service X',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '10',
  //     timestamp: 1672531200000,
  //     severity: 6,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '11',
  //     timestamp: 1672531200000,
  //     severity: 6,
  //     source: 'DB Instace Y',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  //   {
  //     id: '12',
  //     timestamp: 1672531200000,
  //     severity: 4,
  //     source: 'Server',
  //     message: 'This is a log message lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit amet',
  //   },
  // ]

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logs`)

  const logs: Log[] = await res.json()

  return {
    props: {
      logs,
    },
  }
}

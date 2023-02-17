// type imports
import type { NextPage } from 'next'

// default imports
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Loggsy | Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='text-4xl'>Welcome to Loggsy</h1>
      </main>
    </div>
  )
}

export default Home

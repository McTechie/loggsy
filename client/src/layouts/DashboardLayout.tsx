// type imports
import { FC } from 'react'

// named imports
import { Lato } from '@next/font/google'
import { AppBar, Footer, SideBar } from '../components'

// default imports
import Head from 'next/head'
import { useAppSelector } from '../redux/hooks'

// font style for the dashboard
const lato = Lato({
  subsets: ['latin'],  
  weight: ['400', '700'],
  variable: '--font-lato'
})

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const darkMode = useAppSelector(state => state.darkMode.dark)

  return (
    <div className={`${lato.variable} font-sans ${darkMode && 'dark'}`}>
      <Head>
        <title>Loggsy | Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='grid grid-cols-12'>
        {/* left section */}
        <div className='col-span-2 bg-slate-700 text-gray-100 dark:bg-slate-900'>
          <SideBar />
        </div>

        {/* right (main) section */}
        <div className='col-span-10 bg-white text-gray-700 dark:bg-slate-700 dark:text-gray-100'>
          <AppBar darkMode={darkMode} />

          <main className='px-4 py-6'>
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

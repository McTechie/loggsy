// type imports
import { FC } from 'react'

// named imports
import { useEffect } from 'react'
import { Lato } from '@next/font/google'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setMode } from '../redux/slices/darkModeSlice'
import { AppBar, SideBar } from '../components'

// default imports
import Head from 'next/head'

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
  const dispatch = useAppDispatch()

  // Dark Mode Logic
  useEffect(() => {
    // check local storage for dark mode preference
    const mode = localStorage.getItem('loggsyDarkMode')

    if (mode === 'true') {
      dispatch(setMode(true)) // set dark mode to true
    } else if (mode === 'false') {
      dispatch(setMode(false)) // set dark mode to false
    } else {
      // check user preference for dark mode
      const userPreference = window.matchMedia('(prefers-color-scheme: dark)')
      const prefersDarkMode = userPreference.matches

      if (prefersDarkMode) {
        dispatch(setMode(true)) // set mode to global state
        localStorage.setItem('loggsyDarkMode', JSON.stringify(true)) // save dark mode preference to local storage
      } else {
        dispatch(setMode(false)) // set mode to global state
        localStorage.setItem('loggsyDarkMode', JSON.stringify(false)) // save dark mode preference to local storage
      }
    }
  }, [])

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
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

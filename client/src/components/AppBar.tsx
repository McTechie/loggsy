// type imports
import { FC, MouseEvent } from 'react'

// named imports
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useAppDispatch } from '../redux/hooks'
import { toggleDarkMode } from '../redux/slices/darkModeSlice'

interface AppBarProps {
  darkMode: boolean
}

const AppBar: FC<AppBarProps> = ({ darkMode }) => {
  const dispatch = useAppDispatch()

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // prevent default behavior
    dispatch(toggleDarkMode())
  }

  return (
    <header className='flex justify-between items-center px-4 py-3 dark:text-gray-100 bg-emerald-400 dark:bg-indigo-400'>
      <h1 className='text-xl pl-4 border-l-4 border-slate-700 dark:border-gray-100'>
        Loggsy
      </h1>

      <button onClick={handleToggle} className='border-2 border-slate-700 dark:border-gray-100 rounded-full p-1'>
        {darkMode ? (
          <SunIcon className='w-4 h-4' />
          ) : (
          <MoonIcon className='w-4 h-4' />
        )}
      </button>
    </header>
  )
}

export default AppBar

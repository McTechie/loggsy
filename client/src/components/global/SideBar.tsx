// type imports
import { FC } from 'react'

// named imports
import { usePathname } from 'next/navigation'
import { PresentationChartLineIcon, PuzzlePieceIcon, QueueListIcon } from '@heroicons/react/20/solid'

// default imports
import Link from 'next/link'

const links: NavLink[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <PresentationChartLineIcon />
  },
  {
    title: 'View Logs',
    href: '/listing',
    icon: <QueueListIcon />
  },
  {
    title: 'Create Log',
    href: '/create',
    icon: <PuzzlePieceIcon />
  }
]

const SideBar: FC = () => {
  const pathname = usePathname()

  return (
    <aside className='min-h-screen flex flex-col p-4 space-y-20'>
      <div className='flex items-center space-x-4'>
        <div className='h-8 w-8 bg-gray-400 dark:bg-indigo-400 rounded-full' />
        <div>
          <h2 className='text-sm font-semibold border-b pb-[0.15rem]'>Mcvean Soans</h2>
          <p className='text-xs'>Full Stack Developer</p>
        </div>
      </div>

      <div className='flex flex-col flex-1 space-y-4 mr-4 text-sm'>
        {links.map(link => (
          <Link key={link.href} href={link.href}>
            <div className={`nav-link ${
              // To find the currently active sidebar link,
              // check if the current route (irrespective of any sub-routes) is the same as the link href
              (pathname?.split('/')[1] === link.href.split('/')[1]) && 'nav-link-active'
            }`}>
              <div className='w-5 h-5'>
                {link.icon}
              </div>
              <p className='ml-2'>
                {link.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default SideBar

// type imports
import type { AppProps } from 'next/app'

// named imports
import { Lato } from '@next/font/google'

// style imports
import '../styles/globals.css'

const lato = Lato({
  subsets: ['latin'],  
  weight: '400',
  variable: '--font-lato'
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${lato.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}

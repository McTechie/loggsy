// type imports
import type { AppProps } from 'next/app'

// named imports
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { DashboardLayout } from '../layouts'

// style imports
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </Provider>
  )
}

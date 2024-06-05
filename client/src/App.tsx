import { RouterProvider } from 'react-router-dom'
import { appRouter } from './routes/routes'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
import { AuthContextProvider } from './components/context/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})
const App = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={appRouter} />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthContextProvider>
  )
}
export default App

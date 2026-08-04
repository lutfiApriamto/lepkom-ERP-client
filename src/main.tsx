import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { mainRoutes } from '@/routes/main'
import { GlobalToaster } from '@/components/toast'
import GlobalDialogs from '@/components/dialog/GlobalDialogs'
import './index.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Default behavior typically requested
      retry: 1, // Retry failed requests once before showing error
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalToaster />
      <GlobalDialogs />
      <RouterProvider router={mainRoutes} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)

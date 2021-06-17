import { AppProps } from "next/app"
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../components/contexts/SidebarDrawerContext"
import { makeServer } from "../services/mirage"
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {

  if (process.env.NODE_ENV === 'development') {
    makeServer();
  }

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp

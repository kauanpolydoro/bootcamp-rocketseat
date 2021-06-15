import { AppProps } from "next/app"
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../components/contexts/SidebarDrawerContext"
import { makeServer } from "../services/mirage"

function MyApp({ Component, pageProps }: AppProps) {

  if (process.env.NODE_ENV === 'development') {
    makeServer();
  }

  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  )
}

export default MyApp

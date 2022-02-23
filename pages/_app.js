import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import "@fontsource/montserrat-alternates"
import "@fontsource/montserrat/700.css"


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

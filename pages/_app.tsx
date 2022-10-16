import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import "@fontsource/fira-code"
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    'background': '#252525',
    'editor': '#1e1e1e',
    'whiteish': "#FCFFFC",
  },
  // styles: {
  //   global: {
  //     body: {
  //       color: 'gray.300',
  //       backgroundColor: 'zinc.900'
  //     },
  //   },
  // },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp

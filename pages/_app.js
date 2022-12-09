import { ProductsContextProvider } from '../components/ProductsContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <ProductsContextProvider>
      <Component {...pageProps} />
    </ProductsContextProvider>
  )
   
}

export default MyApp

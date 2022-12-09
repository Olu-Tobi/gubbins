import Footer from "./Footer"
import {useContext, useEffect, useState} from "react";
import {ProductsContext} from "./ProductsContext";


const Layout = ({children}) => { 

  const {setSelectedProducts} = useContext(ProductsContext);
  const [success,setSuccess] = useState(false);
  useEffect(() => {
    if (window.location.href.includes('success')) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);
  return (

    <div >
     <div className="mb-1 px-5 border-b border-gray-200 w-full  sm:flex sm:justify-center">
     <h1 className="text-emerald-500 font-bold text-4xl sm:text-3.5xl py-3">Gubbins.</h1>
     </div>
     <div className="p-5">
    
     {success && (
          <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
            Thanks for ordering!
          </div>
        )}
        {children}
    </div>
        <Footer/>
    </div>
   
  )
}

export default Layout
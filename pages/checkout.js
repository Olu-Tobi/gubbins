import { useContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import { ProductsContext } from "../components/ProductsContext"
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);


const checkout = () => {

  const {selectedProducts, setSelectedProducts} = useContext(ProductsContext);
  const [productsInfo, setProductsInfo] = useState([])
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')


  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch('/api/products?ids='+uniqIds.join(','))
    .then(response => response.json())
    .then(json => setProductsInfo(json))
  }, [selectedProducts])
 
  function moreOfProduct(id) {
    setSelectedProducts(prev => [...prev,id])
  }

  function lessOfProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1){
    
      setSelectedProducts(prev => {
        return prev.filter((value, index) => index !== pos);
      })
    }
  }

  

  let subtotal = 0;

  if (selectedProducts?.length){
    for (let id of selectedProducts){
      const price = Array.from(productsInfo).find(p => p._id === id)?.price || 0;
      subtotal += price;
  
    }
    
  }

  let deliveryPrice = 0;

  if (selectedProducts?.length){
    for (let id of selectedProducts){
      const delivPrice = Math.round((subtotal/100)) || 0;
      deliveryPrice = delivPrice;
  
    }
  }

  const total = subtotal + deliveryPrice;


  
  
  return (
    <Layout>
        {!productsInfo.length && (
          <div className="flex justify-center">
            <img  src="https://www.adasglobal.com/img/empty-cart.png" alt=""/>
          </div>
        )}
        <div style={{display: !productsInfo.length ? 'none':'inline'}}>
        {productsInfo.length && 
          productsInfo.map(info => (
            <div className="flex mb-5" key={info._id}>
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img className="w-24" src={info.picture} alt=""/>
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{info.name}</h3>
                <p className="text-sm leading-4 text-gray-500">{info.description}</p>

                <div className="flex mt-2">
                <div className="grow">${info.price}</div>
                <div>
                <button onClick={() => lessOfProduct(info._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                <span className="px-2 ">
                {selectedProducts.filter(id => id === info._id).length}
                </span>
                <button onClick={() => moreOfProduct(info._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
                </div>
              </div>
              </div>
              
            </div>
          ))
        }
        </div>
        <form action="/api/checkout" method="POST">
        <div className="mt-4">
          <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Your name"/>
          <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Streer address, number"/>
          <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and postal code"/>
          <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email adress"/>
        </div>

        <div className="mt-4">

        <div className="flex my-3">
        <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
          <h3 className="font-bold">${subtotal}</h3>
        </div>

        <div className="flex my-3">
        <h3 className="grow font-bold text-gray-400">Delivery:</h3>
          <h3 className="font-bold">${deliveryPrice}</h3>
        </div>

        <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
        <h3 className="grow font-bold text-gray-400">Total:</h3>
          <h3 className="font-bold">${total}</h3>
        </div>
          
        </div>

       
          <input type="hidden" name="products" value= {selectedProducts.join(',')}/>

          <button type='submit' className="bg-emerald-500 px-5 py-2 rounded-xl font-bold my-4 shadow-emerald-200 shadow-lg text-white w-full">Checkout</button>
        </form>

        
    </Layout>
  )
}

export default checkout
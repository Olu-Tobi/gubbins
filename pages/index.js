import { useEffect, useState } from "react"

import Layout from "../components/Layout";
import ProductComp from "../components/ProductComp";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";


export default function Home({products}) {
// const [productsInfo, setProductsInfo] = useState([])
const [phrase, setPhrase] = useState('')

  // useEffect( () => {
  //     fetch('/api/products')
  //     .then(response => response.json())
  //     .then(json => setProductsInfo(json));
  // }, []);

  const category =[...new Set (products.map(p => p.category))]

  // let products;
  // if (phrase) {
  //   products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase));
  // }else{
  //   products = productsInfo;
  // }

  
  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }

  return (

    
    <Layout className="p-5">
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search" className="bg-gray-100 w-full py-2 px-4 rounded-xl "/>
      <div>
      { category.map(cat => (
        
       <div key={cat}>

       {products.find(p => p.category === cat) && (
        <div>
        <h2 className="text-2xl py-5 capitalize">{cat}</h2>
       <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
       {products.filter(p => p.category === cat).map(productList => (
        <div key={productList._id} className='px-5 snap-start'>
          <ProductComp {...productList}/>
        </div>
       ))}
       </div>
        </div>
       )}
       
       </div>
      ))}
      </div>
      
      
    </Layout>
  )
}

export async function getServerSideProps(){
  await initMongoose();

  const products = await findAllProducts();
  return{
    props:{
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

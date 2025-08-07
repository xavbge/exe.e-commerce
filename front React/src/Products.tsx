
import { useEffect, useState } from "react"

const Products = () => {

    const [data, setData] = useState([]);
    
    const products = async () => {
        const response = await fetch('http://localhost:8000/products');
        const json = await response.json();
        setData(json);
        
    }
    
    useEffect(() => {
        products()
        
    }, [])

  return (
    <>
        
    </>
  )
}

export default Products
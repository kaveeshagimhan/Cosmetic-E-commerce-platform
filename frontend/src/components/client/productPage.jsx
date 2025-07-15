import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../productCard";

export default function Product(){
    const [products,setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () =>{
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
                    (res) =>{
                        setProducts(res.data);
                        setIsLoading(false);
                    }
                )
            }
        },[isLoading]
    )

    return(
        <div className="w-full h-full flex flex-wrap justify-center items-center gap-5 p-5">
            {
                products.map((product)=>{
                    return(
                        <ProductCard key={product.productId} product={product} />
                    )
                })
            }
            

        </div>
    )

}
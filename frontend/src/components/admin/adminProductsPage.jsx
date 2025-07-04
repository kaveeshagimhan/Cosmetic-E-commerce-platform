import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";

export default function AdminProductPage(){

    const [products, setProducts] = useState(sampleProducts);
    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
            (res)=>{
                console.log(res.data);
                setProducts(res.data);
            }
        );
    },[]);

    return(
        <div className="w-full h-full max-h-full overflow-y-scroll">
            <table className="w-[calc(90%)] text-center">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Labelled Price</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            (item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.productId}</td>
                                        <td>{item.name}</td>
                                        <td><img src={item.image} className="w-[50px] h-[50px]"/></td>
                                        <td>{item.labelledPrice}</td>
                                        <td>{item.price}</td>
                                        <td>{item.stock}</td>
                                    </tr>
                                )

                            }
                        )
                    }
                    
                    
                </tbody>
            </table>

        </div>
    )
}
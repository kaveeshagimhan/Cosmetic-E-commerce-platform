import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductPage(){

    const [products, setProducts] = useState(sampleProducts);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isLoading == true){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
                (res)=>{
                    console.log(res.data);
                    setProducts(res.data);
                    setIsLoading(false);
                }
            );
        }
        
    },[isLoading]);

    function deleteProduct(productId){
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("Please login first");
            return;
        }
        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, {
            headers:{
                "Authorization": "Bearer " + token
            }
        }).then(()=>{
            toast.success("Product deleted successfully");
            setIsLoading(true);
        }).catch((e)=>{
            toast.error(e.response.data.message);
        })
    }

    return(
        <div className="w-full h-full max-h-full overflow-y-scroll relative">
            <Link to ="/admin/add-product" className="absolute bottom-5 right-5 bg-blue-500 text-2xl text-white font-bold py-2 px-4 rounded cursor-pointer">+</Link>
            {!isLoading ? 
                <table className="w-[calc(90%)] text-center">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Labelled Price</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
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
                                            <td><img src={item.images?.[0]} className="w-[50px] h-[50px]"/></td>
                                            <td>{item.labelledPrice}</td>
                                            <td>{item.price}</td>
                                            <td>{item.stock}</td>
                                            <td><div className="flex flex-row justify-center items-center text-[20px]">
                                                    <FaTrash className="text-red-500 mx-2 cursor-pointer" onClick={()=> deleteProduct(item.productId)}/>
                                                    <FaEdit className="mx-2 text-blue-500 cursor-pointer" onClick={()=>{
                                                        navigate("/admin/edit-product", {
                                                            state: item
                                                        })
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )

                                }
                            )
                        }
                        
                        
                    </tbody>
                </table>
                : <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[50px] h-[50px] border-gray-300 border-[5px] border-t-blue-500 animate-spin rounded-full">
                    </div>

                </div>
            }

        </div>
    )
}
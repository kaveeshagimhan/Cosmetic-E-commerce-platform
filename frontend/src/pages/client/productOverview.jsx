import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ImageSlider from "../../components/imagesSlider";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function ProductOverviewPage(){
    const params = useParams();
    const productId = params.id
    const [status, setStatus] = useState("loading"); //loading, success, error
    const [product, setProduct] = useState(null)

    useEffect(
        () =>{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId).then(
                (response) =>{
                    console.log(response.data)
                    setProduct(response.data)
                    setStatus("success")
                }
            ).catch(
                (error) =>{
                    console.log(error)
                    setStatus("error")
                    toast.error("Error fetching product details")
                }
            )
        }
    ,[])
    return(
        <>
            {status == "success" &&(
                <div className="w-full h-full flex">
                <div className="w-[50%] h-full flex justify-center items-center">
                <ImageSlider images = {product.images}/>
    
                </div>
    
                <div className="w-[50%] h-full bg-blue-900">
    
                </div>
                
            </div> 
            )}
            {status == "loading"&& <Loading />}
        </>
    )
}
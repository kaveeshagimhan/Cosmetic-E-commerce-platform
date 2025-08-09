import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminOrdersPage(){

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
            const token = localStorage.getItem("token");
            if(!token){
                alert("please Login first")
                return;
            }
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res)=>{
                setOrders(req.data);
                console.log(res.data)
                setIsLoading(false);
            }).catch((e)=>{
                alert("Error fetching orders: " + e.response?.data?.massage || "Unknown error");
                setIsLoading(false);
            });
        }
    },[isLoading])
    return(
        <div>

        </div>
    )
} 
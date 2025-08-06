import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFilePlusFill, BsFileMinusFill, BsFillTrashFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
 
export default function CheckOutPage(){
    const location = useLocation();
    console.log(location.state.cart)
    const [cart,setCart] = useState(location.state?.cart || []);

    function getTotal() {
        let total = 0;
        total = getSubTotal() + getShippingFee();
    
        return total;
    }

    function getShippingFee() {
        let fee = 0;
        return fee;
    }
    const shippingFee = getShippingFee();

    function getSubTotal() {
        let total = 0;
    
        cart.forEach((item) => {
            total += item.price * item.qty;
        });
        return total;
    }

    function getItemsTotal() {
        let total = 0;
    
        cart.forEach((item)=>{
            total += item.labelledPrice * item.qty;
        })
        return total;
    }

    function removeFromCart(index){
        const newCart = cart.filter((item, i)=> i !== index)
        setCart(newCart);
    }

    function changeQty(index,qty){
        const newQty = cart[index].qty + qty
        if (newQty <= 0){
            removeFromCart(index)
            return
        }else{
            const newCart = [...cart]
            newCart[index].qty = newQty
            setCart(newCart)
        } 
    }

    async function placeOrder(){
        const token = localStorage.getItem("token")
        if(!token){
            toast.error("Please login to place order")
            return;
        }

        const orderInfomation = {
            product : [],
            phone : "0771234567",
            address : "123 Main Street, Colombo"
        }
        
        for(let i=0; i<cart.length; i++){
            const item = {
                productId: cart[i].productId,
                qty: cart[i].qty
            }
            orderInfomation.product[i] = item
        }
        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderInfomation, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Order placed successfully")
            console.log(res.data)

        }catch(e){
            console.log(e)
            toast.error("Failed to place order, please try again later")
            return;
        }


    }

    return(
        <div className="w-full h-full flex flex-row justify-center pt-4">
            <div className="w-[calc(70%)] flex flex-col items-center">
                {
                    cart.map(
                        (item , index) => {
                            return (
                                <div key = {item.productId} className="w-[600px] my-4 h-[100px] rounded-3xl bg-primary shadow-2xl flex flex-row relative justify-center items-center">
                                    <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl"/>
                                    <div className="w-[250px] h-full flex flex-col justify-center items-start pl-4">
                                        <h1 className="text-xl text-secondary font-semibold">{item.name}</h1>
                                        <h1 className="text-md text-gray-600 font-semibold">{item.productId}</h1>
                                        {
                                            item.labelledPrice > item.price ?
                                            <div>
                                                <span className="text-md mx-1 text-gray-500 line-through">{item.labelledPrice.toFixed(2)}</span>
                                                <span className="text-md mx-1 font-bold text-accent">{item.price.toFixed(2)}</span>
                                            </div>
                                            :<span className="text-md mx-1 font-bold text-accent">{item.price.toFixed(2)}</span>
                                        }

                                    </div>
                                    <div className="w-[100px] h-full flex flex-row justify-between items-center">
                                        <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-accent" onClick={
                                            () =>{
                                                changeQty(index ,-1)
                                            }
                                        }><BsFileMinusFill/></button>
                                        <h1 className="text-2xl text-secondary font-semibold">{item.qty}</h1>
                                        <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-accent" onClick={
                                            () =>{
                                                changeQty(index , 1)
                                            }
                                        }><BsFilePlusFill/></button>

                                    </div>

                                    <div className="w-[200px] h-full flex flex-col justify-center items-end pr-4">
                                        <h1 className="text-2xl text-secondary font-semibold">Rs.{(item.price*item.qty).toFixed(2)}</h1>

                                    </div>
                                    <button className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[-35px]" onClick={
                                        () =>{
                                            removeFromCart(index)
                                        }
                                    }><BsFillTrashFill/></button>

                                </div>
                            )
                        }

                    )
                }
            </div>
            <div className="w-[calc(30%)] mr-6 p-4 border-l-2 border-gray-400 flex flex-col">
                <h1 className="text-xl text-black font-bold">Summery</h1>
                <div className="w-fill h-[100px] flex flex-row ml-2 mt-2">
                    {cart.slice(0, 9).map((item, index) => (
                        <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className="w-[50px] h-[50px] object-cover mb-2 mr-2 rounded-md"
                        />
                    ))}

                </div>
                <div className="flex justify-between items-center">
                        <span className="text-xl text-gray-600">Items Total:</span>
                        <span className="text-xl text-gray-600 text-right line-through">
                            LKR. {getItemsTotal().toFixed(2)}
                        </span>
                </div>

                <div className="flex justify-between items-center">
                        <span className="text-xl text-gray-600">Items Discount:</span>
                        <span className="text-xl text-gray-600 text-right">
                            -LKR.{(getItemsTotal() - getSubTotal()).toFixed(2)}
                        </span>
                </div>

                <hr className="border-1 border-gray-600 mt-4"/>

                <div className="flex justify-between items-center">
                        <span className="text-xl text-black">Sub Total:</span>
                        <span className="text-xl text-black text-right">
                            LKR. {getSubTotal().toFixed(2)}
                        </span>
                </div>

                <div className="flex justify-between items-center">
                        <span className="text-xl text-black">Shipping:</span>
                        <span className="text-xl text-black text-right">
                            {shippingFee === 0 ? "Free" : `LKR. ${shippingFee}`}
                        </span>
                </div>
                <p className="text-2xl font-bold text-black">Total:
                        <span>
                           LKR. {getTotal().toFixed(2)}
                        </span>
                
                </p>
                <button className="w-[100px] text-white bg-accent px-4 py-4 rounded-lg font-bold hover:bg-secondary transition-all duration-300"
                    onClick={placeOrder}
                >
                    Place Order
                </button>

            </div>

        </div>
    )
}
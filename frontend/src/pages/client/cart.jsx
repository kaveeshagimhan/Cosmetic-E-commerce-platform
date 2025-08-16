import { useState } from "react";
import { addToCart, getCart, getSubTotal, removeFromCart, getItemsTotal, getShippingFee, getTotal } from "../../utils/cart";
import { BsFilePlusFill, BsFileMinusFill, BsFillTrashFill} from "react-icons/bs";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartPage(){
    const [cart,setCart] = useState(getCart());
    const shippingFee = getShippingFee();

    return(
        <div className="w-full h-full flex flex-row justify-center pt-4">
            <div className="w-full md:w-[calc(70%)] flex flex-col md:items-center">
                {
                    cart.map(
                        (item) => {
                            return (
                                <div key = {item.productId} className="w-full md:w-[600px] my-4 h-[80px] md:h-[100px] rounded-3xl bg-primary shadow-2xl flex flex-row relative md:justify-center items-center">
                                    <img src={item.image} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover rounded-3xl"/>
                                    <div className="md:w-[250px] h-full flex flex-col justify-center items-start pl-1 md:pl-4">
                                        <h1 className="text-2xl md:text-xl text-secondary font-semibold">{item.name}</h1>
                                        <h1 className="text-xl md:text-md text-gray-600 font-semibold">{item.productId}</h1>
                                        {
                                            item.labelledPrice > item.price ?
                                            <div>
                                                <span className="text-md mx-1 text-gray-500 line-through">{item.labelledPrice.toFixed(2)}</span>
                                                <span className="text-md mx-1 font-bold text-accent">{item.price.toFixed(2)}</span>
                                            </div>
                                            :<span className="text-md mx-1 font-bold text-accent">{item.price.tiFixed(2)}</span>
                                        }

                                    </div>
                                    <div className="md:w-[100px] h-full md:flex flex-row justify-between items-center hidden">
                                        <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-sm md:text-xl cursor-pointer aspect-square bg-accent" onClick={
                                            () =>{
                                                addToCart(item, -1)
                                                setCart(getCart())
                                            }
                                        }><BsFileMinusFill/></button>
                                        <h1 className="text-md md:text-2xl text-secondary font-semibold">{item.qty}</h1>
                                        <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-sm md:text-xl cursor-pointer aspect-square bg-accent" onClick={
                                            () =>{
                                                addToCart(item, 1)
                                                setCart(getCart)
                                            }
                                        }><BsFilePlusFill/></button>

                                    </div>

                                    {/*only for sm device*/}

                                    <div className="md:w-[100px] h-full flex flex-col justify-center items-center md:hidden pt-2 pb-2 pr-2">
                                        <button className="text-white font-bold rounded-xl hover:bg-secondary  text-xl md:text-xl cursor-pointer aspect-square bg-accent" onClick={
                                            () =>{
                                                addToCart(item, 1)
                                                setCart(getCart())
                                            }
                                        }><FaAngleUp /></button>
                                        <h1 className="text-md md:text-2xl text-secondary font-semibold">{item.qty}</h1>
                                        <button className="text-white font-bold rounded-xl hover:bg-secondary  text-xl md:text-xl cursor-pointer aspect-square bg-accent" onClick={
                                            () =>{
                                                addToCart(item, -1)
                                                setCart(getCart)
                                            }
                                        }><FaAngleDown /></button>

                                    </div>

                                    <div className="md:w-[200px] h-full flex flex-col justify-center md:items-end md:pr-4">
                                        <h1 className="text-xl text-secondary font-semibold">Rs.{(item.price*item.qty).toFixed(2)}</h1>

                                    </div>
                                    <button className="text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full absolute right-0" onClick={
                                        () =>{
                                            removeFromCart(item.productId)
                                            setCart(getCart())
                                        }
                                    }><BsFillTrashFill/></button>

                                </div>
                            )
                        }

                    )
                }
            </div>
            {/*Only for up to md*/}
            <div className="w-[calc(30%)] hidden mr-6 p-4 border-l-2 border-gray-400 md:flex flex-col">
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
                            -LKR. {(getItemsTotal() - getSubTotal()).toFixed(2)}
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
                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="w-[100px] text-white bg-accent px-4 py-4 rounded-lg font-bold hover:bg-secondary transition-all duration-300">
                    Checkout
                </Link>

            </div>
                {/*Small device shows*/}
            <div className="md:hidden w-full mr-6 p-4 border-l-2 border-gray-400 flex flex-col absolute bottom-0">
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
                            -LKR. {(getItemsTotal() - getSubTotal()).toFixed(2)}
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
                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="w-[100px] text-white bg-accent px-4 py-4 rounded-lg font-bold hover:bg-secondary transition-all duration-300">
                    Checkout
                </Link>

            </div>

        </div>
    )
}
import { Route, Routes } from "react-router-dom";
import Header from "./header";
import Product from "../pages/client/productPage";
import ProductOverviewPage from "../pages/client/productOverview";
import CartPage from "../pages/client/cart";
import CheckOutPage from "../pages/client/checkOut";

export default function HomePage(){
    return(
        <div className="w-full h-screen flex flex-col items-center">
            <div className="fixed left-0 top-0 w-full z-50 bg-white"><Header /></div>
            <div className="w-full h-[calc(100%-80px)] flex flex-col items-center pt-[80px]">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home</h1>}/>
                    <Route path="/products" element={<Product/>}/>
                    <Route path="/about" element={<h1>About</h1>}/>
                    <Route path="/contact" element={<h1>Contact</h1>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/overview/:id" element={<ProductOverviewPage/>}/>
                    <Route path="/checkout" element={<CheckOutPage/>}/>
                    <Route path="/*" element={<h1>404 Not Found</h1>}/>
                </Routes> 

            </div>

        </div>
         
    )
}
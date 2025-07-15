import { Route, Routes } from "react-router-dom";
import Header from "./header";
import Product from "./client/productPage";

export default function HomePage(){
    return(
        <div className="w-full h-screen flex flex-col items-center">
            <Header />
            <div className="w-full h-[calc(100%-80px)] flex flex-col items-center">
                <Routes path="/*">
                    <Route path="/" element={<h1>Home</h1>}/>
                    <Route path="/products" element={<Product/>}/>
                    <Route path="/about" element={<h1>About</h1>}/>
                    <Route path="/contact" element={<h1>Contact</h1>}/>
                    <Route path="/*" element={<h1>404 Not Found</h1>}/>
                </Routes> 

            </div>

        </div>
         
    )
}
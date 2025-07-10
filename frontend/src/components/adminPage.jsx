import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductsPage";
import AddProductPage from "./admin/addProductPage";

export default function AdminPage(){
    return(
        
        <div className= "w-full h-screen flex">
            <div className= "w-[300px] h-full flex flex-col bg-red-900">
                <Link to = "/admin/products">Products</Link>
                <Link to = "/admin/users">Users</Link>
                <Link to = "/admin/orders">Orders</Link>
                <Link to = "/admin/reviews">Reviews</Link>

            </div>
            <div className= "h-full w-[calc(100%-300px)]">
                <Routes path= "/*">
                    <Route path = "/products" element ={<AdminProductPage/>}/>
                    <Route path = "/users" element = {<h1>Users</h1>}/>
                    <Route path = "/orders" element = {<h1>Orders</h1>}/>
                    <Route path = "/reviews" element = {<h1>Reviews</h1>}/>
                    <Route path = "/add-product" element = {<AddProductPage/>}/>
                </Routes>

            </div>

        </div>
    )
}
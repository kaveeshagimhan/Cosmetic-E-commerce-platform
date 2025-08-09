import { Link, Route, Routes, useLocation } from "react-router-dom";
import AddProductPage from "../pages/admin/addProductPage";
import EditProductPage from "../pages/admin/editProductPage";
import AdminProductPage from "../pages/admin/productsPage";

export default function AdminPage(){

    const location = useLocation();
    const path = location.pathname;

    function getClass(name){
        if(path.includes(name)){
            return "bg-gray-700 p-4"
        }else{
            return "text-accent p-4"
        }
    }
    return(
        
        <div className= "w-full h-screen flex">
            <div className= "w-[200px] h-full flex flex-col bg-gray-500 px-4 text-accent font-bold gap-6">
                <Link className = {getClass("products")} to = "/admin/products">Products</Link>
                <Link className = {getClass("users")} to = "/admin/users">Users</Link>
                <Link className = {getClass("orders")} to = "/admin/orders">Orders</Link>
                <Link className = {getClass("reviews")} to = "/admin/reviews">Reviews</Link>

            </div>
            <div className= "h-full w-[calc(100%-200px)]">
                <Routes path= "/*">
                    <Route path = "/products" element ={<AdminProductPage/>}/>
                    <Route path = "/users" element = {<h1>Users</h1>}/>
                    <Route path = "/orders" element = {<h1>Orders</h1>}/>
                    <Route path = "/reviews" element = {<h1>Reviews</h1>}/>
                    <Route path = "/add-product" element = {<AddProductPage/>}/>
                    <Route path = "/edit-product" element = {<EditProductPage/>}/>
                </Routes>

            </div>

        </div>
    )
}
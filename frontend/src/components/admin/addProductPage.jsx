import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddProductPage(){

    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [altNames, setAltNames] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [labelledPrice, setLabelledPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

   


    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <input type = "text" placeholder="Product ID" className="input input-bordered w-full max-w-xs" value={productId} onChange={(e)=>{setProductId(e.target.value)}}/>
            <input type = "text" placeholder="Product Name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <input type = "text" placeholder="Alt Names" className="input input-bordered w-full max-w-xs" value={altNames} onChange={(e)=>{setAltNames(e.target.value)}}/>
            <input type = "text" placeholder="Description" className="input input-bordered w-full max-w-xs" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <input type = "file" placeholder="Images" multiple className="input input-bordered w-full max-w-xs" value={images} onChange={(e)=>{setImages(e.target.files)}}/>
            <input type = "text" placeholder="Labelled Price" className="input input-bordered w-full max-w-xs" value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}}/>
            <input type = "text" placeholder="Price" className="input input-bordered w-full max-w-xs" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <input type = "text" placeholder="Stock" className="input input-bordered w-full max-w-xs" value={stock} onChange={(e)=>{setStock(e.target.value)}}/>
            <div className="w-full flex flex-row justify-center items-center mt-4">
                <Link to = "/admin/products" className="bg-red-400 text-white font-bold py-2 px-4 rounded mr-4">Cancel</Link>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">Add Product</button>

            </div>

        </div>
    )

}
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    return (
        <Link to={"/overview/"+ product.productId} className="w-[300px] h-[450px] shadow-lg rounded-xl m-4 bg-white hover:scale-105 transition-transform duration-300 overflow-hidden">
            <div className="w-full h-[220px] bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                    src={product.images?.[0] || "https://via.placeholder.com/300x220?text=No+Image"} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="p-4 flex flex-col justify-between h-[230px]">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2 overflow-hidden max-h-[48px]">
                    {product.description}
                </p>
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <span className="text-gray-500 line-through text-sm">Rs. {product.labelledPrice}</span><br />
                        <span className="text-green-600 text-lg font-bold">Rs. {product.price}</span>
                    </div>
                    <div className={`text-sm px-2 py-1 rounded ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
                    </div>
                </div>
                <div className="flex gap-2 mt-auto">
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex-1"
                        disabled={product.stock <= 0}
                    >
                        {product.stock > 0 ? "Add to Cart" : "Unavailable"}
                    </button>
                    <button
                        disabled={!product.isAvailable || product.stock <= 0}
                        className="px-3 py-1 text-5m rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition"
                        onClick={(e)=>{
                            navigate("/checkout",{
                                state:{
                                    cart:[
                                    {
                                        productId: product.productId,
                                        name: product.name,
                                        image: product.image[0],
                                        price: product.price,
                                        labelledPrice: product.labelledPrice,
                                        qty: 1

                                    }]
                                }
                            })

                        }}
                    >
                        {product.isAvailable && product.stock > 0 ? "Buy Now" : "Unavailable"}

                    </button>
                </div>
                
            </div>
        </Link>
    );


}

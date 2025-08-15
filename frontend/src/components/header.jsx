import { Link, useNavigate } from "react-router-dom";
import UserData from "./userData";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {
    const navigate = useNavigate();
    const [isSiedDrawerOpened, setSiedDrawerOpened] = useState(true)
    return(
        <header className="w-full h-[80px] shadow-2xl flex justify-center relative">
            <GiHamburgerMenu className="h-full text-3xl md:hidden absolute left-2"/>
            <img onClick= {() =>
                navigate("/")
            }
            src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer ">
            </img>
            <div className="w-[calc(100%-160px)] h-full hidden md:flex justify-center items-center">
                <Link to="/" className="text-[20px] font-bold mx-2">Home</Link>
                <Link to="/products" className="text-[20px] font-bold mx-2">Products</Link>
                <Link to="/about" className="text-[20px] font-bold mx-2">About</Link>
                <Link to="/contact" className="text-[20px] font-bold mx-2">Contact</Link>

            </div>
            <div className="w-[80px] hidden md:flex justify-center items-center">
                <Link to="/cart" className="text-[20px] font-bold mx-2">
                    <BsCart3/>
                </Link>

            </div>
            {
                isSiedDrawerOpened &&
                <div className="fixed w-full h-screen bg-[#00000060] md:hidden">

                </div>
            }


        </header>
    )
}
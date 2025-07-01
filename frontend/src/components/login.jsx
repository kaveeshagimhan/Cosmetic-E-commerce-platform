import axios from "axios";
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){
        try{
            const response = await axios.post("http://localhost:3000/api/users/login", {
                email: email,
                password : password
            })
            alert("hihi")
            toast.success("Login Successful")
            console.log(response);

        }catch(e){
            toast.error(e.response.data.message)
        }
        
    }

    return(
        <div className = "w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex flex-row justify-evenly items-center" >
            <div className = "w-[50%] h-full">

            </div>
            <div className = "w-[50%] h-full flex flex-col justify-center items-center">
                <div className="w-[400px] h-[600px]  backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className="w-[300px] h-[50px] border border-white rounded-[20px] my-[20px]"/>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type="password"className="w-[300px] h-[50px] border border-white rounded-[20px] mb-[20px]"/>
                    <button onClick={handleLogin} className="w-[100px] h-[50px] bg-[#D28595] rounded-[20px] border border-white text-white font-bold text-xl mt-4 my-[20px] cursor-pointer">Login</button>
                    


                </div>
                
            </div>

        </div>
    )
} 
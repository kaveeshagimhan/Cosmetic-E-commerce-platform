export default function LoginPage() {
    return(
        <div className = "w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex flex-row justify-evenly items-center" >
            <div className = "w-[50%] h-full">

            </div>
            <div className = "w-[50%] h-full flex flex-col justify-center items-center">
                <div className="w-[400px] h-[600px]  backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
                    <input className="w=[300px] h-[50px] border border-white rounded-[20px] my-[20px]"/>
                    <input type="password"className="w=[300px] h-[50px] border border-white rounded-[20px] mb-[20px]"/>
                    <button className="w-[300px] h-[50px] bg-[#D28595] rounded-[20px] text-white font-bold text-xl mt-4 my-[20px]">Login</button>
                    


                </div>
                
            </div>

        </div>
    )
} 
export default function ImageSlider(props){
    const images = props.images;

    return(
        <div className="w-[500px] h-[600px] bg-red-900">
            <img className="w-full h-[500px]"/>
            <div className="w-full h-[100px] bg-blue-500 flex justify-center items-center">
                {
                    images.map(
                        (images,index)=>{
                            return (
                                <img key={index} className="w-[100px] h-[100px] m-2" src={images}/>
                            )
                        }
                    )
                }

            </div>

        </div>
    )
}
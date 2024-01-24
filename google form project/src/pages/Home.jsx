import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import viewForm from "./background.jpg";
import viewForm from "./vector.png";


const Home = () => {
    
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("googleForm"))  || [])
    }, []);

    // console.log(data);
    
  return (
    <>
        <div className="flex flex-col p-10">
            <h1 className="pb-3 text-lg">Start a new form</h1>
            <div className="flex flex-row flex-wrap">

                <Link to="/create-form-2.0" className="flex flex-col mb-2 mr-4">
                    <div className="bg-cover border border-gray-300 bg-no-repeat bg-center w-36 h-36 bg-gray-300 mt-4 flex justify-center items-center" style={{backgroundImage: `url(https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png)`}} ></div>  
                    <span className="text-sm mt-1 text-center">Create Form</span>
                </Link>

                {
                    data?.map((curElem, index) => {
                        return (
                            <Link key={index} to={`/show-form/${index}`} className="flex flex-col mb-2 mr-4">
                                <div className="w-36 h-36 ps-1 pr-3 mt-4 border border-slate-300 flex justify-center items-center">
                                    <img src={viewForm} className="w-16 h-16" alt="" />
                                </div>  
                                <span className="text-sm mt-1 text-center">{curElem?.formTitle}</span>
                            </Link>    
                        )
                    })
                }
                
            </div>
        </div>
    </>
  )
}

export default Home

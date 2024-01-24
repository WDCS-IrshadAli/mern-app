import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import viewForm from "./background.jpg";
import viewForm from "./vector.png";


const Home = () => {
    
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("googleForm"))  || [])
    }, []);

    // DELETE FORM
    const deleteForm = (index) => {
        let newData = data?.filter((curElem, indexx) => index!==indexx);
        localStorage.setItem("googleForm", JSON.stringify(newData));
        setData(newData)
    }

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
                            <div className="flex flex-col mb-2 mr-4" key={index}>
                                <Link to={`/show-form/${index}`}>
                                    <div className="w-36 h-36 ps-1 pr-3 mt-4 border border-slate-300 flex justify-center items-center">
                                        <img src={viewForm} className="w-16 h-16" alt="" />
                                    </div>  
                                </Link>    
                                <div className="text-sm mt-1 text-center flex flex-row justify-between">
                                    <span></span>
                                    <span>{curElem?.formTitle}</span>
                                    <span>
                                        <button type="button" onClick={() => deleteForm(index)} className="text-red-500 px-1 border border-red-400 font-bold">&#10799;</button>
                                    </span>
                                </div>

                            </div>


                        )
                    })
                }
                
            </div>
        </div>
    </>
  )
}

export default Home

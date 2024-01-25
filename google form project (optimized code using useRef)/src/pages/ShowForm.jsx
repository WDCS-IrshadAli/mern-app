import React, { Fragment, useEffect, useRef, useState } from 'react'
import wallpaper from "./background.jpg"
import { useParams } from 'react-router-dom'

const ShowForm = () => {
  
  const id = useParams();
  const urlId = id.id;
  const [data, setData] = useState();

  useEffect(() => {
    JSON.parse(localStorage.getItem("googleForm"))?.filter((curElem, index) => curElem?.uniqueId === urlId && setData(curElem))
  }, [urlId]);

  // console.log(data);
  
  return (
    <>
      <div className="flex flex-col py-10 px-5 md:px-[15%]">

        <div className="h-40 w-full bg-cover bg-no-repeat bg-center rounded-md mb-8" style={{backgroundImage: `url(${wallpaper})`}}></div>

        <div className="rounded-md p-5 border border-slate-400 border-l-slate-700 border-l-8 mb-5">
          <h1 className="text-3xl mb-3">{data?.formTitle}</h1>
          <h3 className="text-sm text-slate-600">{data?.formDesc}</h3>
        </div>

        <FormComponent data={data} urlId={urlId} />

      </div>
    </>
  )
}

export default ShowForm


export const FormComponent = ({ data, urlId }) => {

  const inputRef = useRef({});
  const selectedRef = useRef({});
  const [render, setRender] = useState(false);

  // HANDLE CHANGE FUNCTION
  const handleChange = (e) => {
    const {name, value} = e.target;
    inputRef.current = {
      ...inputRef.current,
      [name]: value
    }
    // setInput({
    //   ...input,
    //   [name]: value,
    // })
  }

  // CHECKBOX FUNCTION WITH NEW STATE
  const handleSelected = (e) => {
    const {name, value, checked} = e.target;

    if (checked) {
      let selectedValue = selectedRef.current[`${name}`]===undefined ? [] : selectedRef.current[`${name}`];
      selectedRef.current = {
        ...selectedRef.current,
        [name]: [...selectedValue, value]
      }
    } else {
      let selectedValue = selectedRef.current[`${name}`]?.filter((curElem) => curElem!==value);
      selectedRef.current = {
        ...selectedRef.current,
        [name]: selectedValue
      }
    }
  }

  // GOOGLE FORM SUBMIT FUNCTION
  const submitData = (e) => {
    e.preventDefault();
    setRender(!render);
    let mixUpData = {...inputRef.current, ...selectedRef.current, responseId: urlId}
    console.log("submitted data", mixUpData);

    if (localStorage.getItem("googleFormResponse")) {
      let prevDT = JSON.parse(localStorage.getItem("googleFormResponse"));
      localStorage.setItem("googleFormResponse", JSON.stringify([...prevDT, mixUpData]));
    } else {
      localStorage.setItem("googleFormResponse", JSON.stringify([mixUpData]));
    }
  }

  console.log(inputRef);
  // console.log(selected);
  return (
    <>  
      <form onSubmit={submitData}>  
        {
          data?.formData?.map((curElem, index) => {
            let name=`name${index}`;
            return (
              <div key={index} className="flex flex-col rounded-md p-5 border border-slate-400 border-l-slate-700 border-l-8 mb-5">      
                {
                  curElem?.inputType === "textarea" 
                  ?
                  <>
                    <label htmlFor={name} className="text-md mb-2">{curElem?.question} {curElem?.required && <span className="text-red-600">*</span>}</label>
                    <textarea name={name} onChange={handleChange} id={name} placeholder="Long answer text..." className="border border-slate-400 rounded-md p-2" required={curElem?.required}></textarea>
                  </>
                  :
                  curElem?.inputType === "text"
                  ?
                  <>
                    <label htmlFor={name} className="text-md mb-2">{curElem?.question} {curElem?.required && <span className="text-red-600">*</span>}</label>
                    <input type="text" name={name} onChange={handleChange} id={name} placeholder="Short answer text..." className="border border-slate-400 rounded-md p-2" required={curElem?.required} />
                  </>
                  :
                  curElem?.inputType === "number"
                  ?
                  <>
                    <label htmlFor={name} className="text-md mb-2">{curElem?.question} {curElem?.required && <span className="text-red-600">*</span>}</label>
                    <input type="number" name={name} onChange={handleChange} id={name} placeholder="Short answer number..." className="border border-slate-400 rounded-md p-2" required={curElem?.required} />
                  </>
                  :
                  curElem?.inputType === "date"
                  ?
                  <>
                    <label htmlFor={name} className="text-md mb-2">{curElem?.question} {curElem?.required && <span className="text-red-600">*</span>}</label>
                    <input type="date" name={name} onChange={handleChange} id={name} placeholder="Select date..." className="border border-slate-400 rounded-md p-2" required={curElem?.required} />
                  </>
                  :
                  curElem?.inputType === "radio"
                  ?
                  <>
                    <label className="text-md mb-3">{curElem?.question} {curElem?.required && <span className="text-red-600">*</span>}</label>
                    {
                      curElem?.otherInput?.map((curElemzz, indexxxxx) => {
                        return (
                          <div key={indexxxxx} className="flex flex-row items-center mb-1">
                            <input type="radio" name={name} value={curElemzz?.value} onChange={handleChange} id={name+indexxxxx} className="mr-2" required={curElem?.required} />
                            <label className="text-[15px]" htmlFor={name+indexxxxx}>{curElemzz?.label}</label>
                          </div>
                        )
                      })
                    }
                  </>
                  :
                  curElem?.inputType === "checkbox"
                  ?
                  <>
                    <label className="text-md mb-3">{curElem?.question} {curElem?.required && <span className="text-red-600">*</span>}</label>
                    {
                      curElem?.otherInput?.map((curElemzzz, indexx) => {
                        return (
                          <div key={indexx} className="flex flex-row items-center mb-1">
                            <input type="checkbox" name={name} value={curElemzzz?.value} onChange={handleSelected} id={name+indexx} className="mr-2" required={curElem?.required} />
                            <label className="text-[15px]" htmlFor={name+indexx}>{curElemzzz?.label}</label>
                          </div>
                        )
                      })
                    }
                  </>
                  :
                  curElem?.inputType === "select"
                  ?
                  <>
                    <label className="text-md mb-3">{curElem?.question} {curElem?.required && <span className="text-red-600">*</span>}</label>
                    <select name={name} onChange={handleChange} className="border border-slate-400 p-2 rounded-md">
                      {/* <option value="no-option-selected"  ={curElem?.required} disabled={true}>No options selected</option> */}
                      {
                        curElem?.otherInput?.map((curElemzzzz, indexx) => {
                          return (
                            <option key={indexx} value={curElemzzzz?.value} defaultValue={indexx===0 && curElemzzzz?.value}>
                              {curElemzzzz?.label}
                            </option>
                          )
                        })
                      }
                    </select>
                  </>
                  :
                  ""
                }
              </div>
            )
          })
        }
        <button type="submit" className="bg-black text-white p-2 rounded-md px-4">Submit</button>
      </form>
    </>
  )
}
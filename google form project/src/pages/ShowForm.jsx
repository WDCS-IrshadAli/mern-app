import React, { Fragment, useState } from 'react'
import wallpaper from "./background.jpg"
import { useParams } from 'react-router-dom'

const ShowForm = () => {
  
  const id = useParams();
  const urlId = Number(id.id);
  const data = JSON.parse(localStorage.getItem("googleForm"))[urlId]
  // console.log(data);
  
  return (
    <>
      <div className="flex flex-col py-10 px-5 md:px-[15%]">

        <div className="h-40 w-full bg-cover bg-no-repeat bg-center rounded-md mb-8" style={{backgroundImage: `url(${wallpaper})`}}></div>

        <div className="rounded-md p-5 border border-slate-400 border-l-slate-700 border-l-8 mb-5">
          <h1 className="text-3xl mb-3">{data?.formTitle}</h1>
          <h3 className="text-sm text-slate-600">{data?.formDesc}</h3>
        </div>

        <FormComponent data={data} />

      </div>
    </>
  )
}

export default ShowForm


export const FormComponent = ({ data }) => {
  
  const [input, setInput] = useState({});
  const [selected, setSelected] = useState({});
  const handleChange = (e) => {
    const {name, value} = e.target;
    setInput({
      ...input,
      [name]: value,
    })
  }

  const handleSelected = (e) => {
    const {name, value, checked} = e.target;
    console.log(name, value, checked);

    if (e.target.checked) {
      let selectedValue = selected[`${name}`]===undefined ? [] : selected[`${name}`];
      setSelected({
        ...selected,
        [name]: [...selectedValue, value]
      })
    } else {
      let selectedValue = selected[`${name}`]?.filter((curElem) => curElem!==value);
      setSelected({
        ...selected,
        [name]: selectedValue
      })
    }
  }

  const submitData = (e) => {
    e.preventDefault();
    let mixUpData = {...input, ...selected}
    console.log("submitted data", mixUpData);
  }

  // console.log(input);
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
                    <label htmlFor={name} className="text-md mb-2">{curElem?.question}</label>
                    <textarea name={name} onChange={handleChange} id={name} placeholder="Long answer text..." className="border border-slate-400 rounded-md p-2"></textarea>
                  </>
                  :
                  curElem?.inputType === "text"
                  ?
                  <>
                    <label htmlFor={name} className="text-md mb-2">{curElem?.question}</label>
                    <input type="text" name={name} onChange={handleChange} id={name} placeholder="Short answer text..." className="border border-slate-400 rounded-md p-2" />
                  </>
                  :
                  curElem?.inputType === "number"
                  ?
                  <>
                    <label htmlFor={name} className="text-md mb-2">{curElem?.question}</label>
                    <input type="number" name={name} onChange={handleChange} id={name} placeholder="Short answer number..." className="border border-slate-400 rounded-md p-2" />
                  </>
                  :
                  curElem?.inputType === "date"
                  ?
                  <>
                    <label htmlFor={name} className="text-md mb-2">{curElem?.question}</label>
                    <input type="date" name={name} onChange={handleChange} id={name} placeholder="Select date..." className="border border-slate-400 rounded-md p-2" />
                  </>
                  :
                  curElem?.inputType === "radio"
                  ?
                  <>
                    <label className="text-md mb-3">{curElem?.question}</label>
                    {
                      curElem?.otherInput?.map((curElem, indexxxxx) => {
                        return (
                          <div key={indexxxxx} className="flex flex-row items-center mb-1">
                            <input type="radio" name={name} value={curElem?.value} onChange={handleChange} id={name+indexxxxx} className="mr-2" />
                            <label className="text-[15px]" htmlFor={name+indexxxxx}>{curElem?.label}</label>
                          </div>
                        )
                      })
                    }
                  </>
                  :
                  curElem?.inputType === "checkbox"
                  ?
                  <>
                    <label className="text-md mb-3">{curElem?.question}</label>
                    {
                      curElem?.otherInput?.map((curElem, indexx) => {
                        return (
                          <div key={indexx} className="flex flex-row items-center mb-1">
                            <input type="checkbox" name={name} value={curElem?.value} onChange={handleSelected} id={name+indexx} className="mr-2" />
                            <label className="text-[15px]" htmlFor={name+indexx}>{curElem?.label}</label>
                          </div>
                        )
                      })
                    }
                  </>
                  :
                  curElem?.inputType === "select"
                  ?
                  <>
                    <label className="text-md mb-3">{curElem?.question}</label>
                    <select name={name} onChange={handleChange} className="border border-slate-400 p-2 rounded-md">
                      {
                        curElem?.otherInput?.map((curElem, indexx) => {
                          return (
                            <option key={indexx} value={curElem?.value}>
                              {curElem?.label}
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
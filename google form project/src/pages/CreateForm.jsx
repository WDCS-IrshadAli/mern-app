import React, { useId, useState } from 'react'
import { useNavigate } from "react-router-dom"

const CreateForm = () => {

  const navigate = useNavigate()
  const [formFields, setFormFields] = useState([]);
  const [addFieldsHandler, setAddFieldsHandler] = useState("text");
  const id = useId();

  const [data, setData] = useState({ formTitle: "", formDesc: "", formData: [] });

  const addFields = (e) => {
    e.preventDefault();
    let inputToAdd;
    if (addFieldsHandler === "text" || addFieldsHandler === "textarea" || addFieldsHandler === "number" || addFieldsHandler === "date") {
      inputToAdd = {
        inputType: addFieldsHandler,
        question: "",
      }      
    } else {
      inputToAdd = {
        inputType: addFieldsHandler,
        question: "",

        otherInput: []
      }      
    }
    setFormFields([
      ...formFields,
      inputToAdd
    ])
    setData({
      ...data,
      formData: [...data.formData, inputToAdd]
    })
  }

  const createGoogleForm = (e) => {
    e.preventDefault();
    if (localStorage.getItem("googleForm")) {
      let gfData = JSON.parse(localStorage.getItem("googleForm"));
      localStorage.setItem("googleForm", JSON.stringify([...gfData, data]));
    } else {
      localStorage.setItem("googleForm", JSON.stringify([data]));
    }
    console.log("Submitted data", data);
    setTimeout(() => {
      navigate("/")
    }, 1000)
  }

  return (
    <>      
      <div className="flex flex-col p-10">
        <h1 className="pb-5 text-3xl">Create form...</h1>

        {/* ADD FIELDS FORM  */}
        <div className="flex flex-col w-full md:w-96 border border-black p-2 mb-5">
          <h2 className="text-sm mb-3">Create input fields from here...</h2>
          <form className="flex flex-row" onSubmit={addFields}>
            <select name="inputType" className="border border-black" onChange={(e) => setAddFieldsHandler(e.target.value)}>
              <option value="text">Short answer (text)</option>
              <option value="textarea">Textarea</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
              <option value="select">Select option (Dropdown)</option>
            </select>
            <button className="bg-black text-white text-sm px-1 ml-5 disabled:opacity-35" disabled={addFieldsHandler===""}>Add Field</button>
          </form>
        </div>


        {/* ORIGINAL FORM  */}
        <form className="flex flex-col gap-3 w-full md:w-96" key={id} onSubmit={createGoogleForm}> 
          
          <div className="flex flex-col bg-slate-300 p-3">
            <label htmlFor="formTitle" className="text-sm mb-1 text-slate-500">Form Title</label>
            <input onChange={(e) => setData({...data, formTitle: e.target.value})} type="text" name="formTitle" placeholder="Title..." id="formTitle" className="border-b-2 border-black bg-transparent outline-none" />
          </div>

          <div className="flex flex-col bg-slate-300 p-3">
            <label htmlFor="formDesc" className="text-sm mb-1 text-slate-500">Form Description</label>
            <input onChange={(e) => setData({...data, formDesc: e.target.value})} type="text" name="formDesc" placeholder="Description..." id="formDesc" className="border-b-2 border-black bg-transparent outline-none" />
          </div>

          {
            data?.formData?.map((curElem, index) => {
              return (
                <>
                  <Field key={index} index={index} curElem={curElem} data={data} setData={setData} />
                </>
              )
            })
          }
          
          <button type="submit" className="bg-black text-white text-sm p-1 my-1">Submit</button>
        </form>

      </div>
    </>
  )
}

export default CreateForm

export const Field = ({ curElem, index, data, setData }) => {

  const [labelValue, setLabelValue] = useState({ label: "", value: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabelValue({
        ...labelValue,
        [name]: value,
    });
  }

  const addLabelValue = (e) => {
    e.preventDefault();
    setData({
      ...data,
      formData: data?.formData?.map((curElem, indexxx) => {
        if (index === indexxx) {
          return {...curElem, otherInput: [ ...curElem.otherInput, labelValue ]}
        }
        return curElem
      })
    })
    setLabelValue({ label: "", value: "" });
  }

  return (
    <div key={index} className="flex flex-col bg-slate-300 p-3">
      <label htmlFor={index} className="text-sm mb-1 text-slate-500">{curElem?.inputType.charAt(0).toUpperCase() + curElem?.inputType.slice(1)} Input</label>
      <input onChange={(e) => setData({
        ...data, 
        formData: data?.formData?.map((curElem, indexxx) => {
          if (index===indexxx) {
            return {...curElem, question: e.target.value}
          }
          return curElem
        }) 
      })} type="text" name="form" placeholder="Question..." id={index} className="border-b-2 border-black bg-transparent outline-none" />

      {
        (curElem?.inputType === "checkbox" || curElem?.inputType === "radio" || curElem?.inputType === "select") 
        && 
        <div className="flex flex-row mt-2 w-full flex-wrap">
          <div className="w-[40%] flex flex-col pr-4">
            <label className="text-sm mb-1 text-slate-500">Label</label>
            <input onChange={handleChange} value={labelValue.label} type="text" name="label" className="border-b-2 border-black bg-transparent outline-none" placeholder="Label" />
          </div>

          <div className="w-[40%] flex flex-col pl-4">
            <label className="text-sm mb-1 text-slate-500">Value</label>
            <input onChange={handleChange} value={labelValue.value} type="text" name="value" className="border-b-2 border-black bg-transparent outline-none" placeholder="Value" />
          </div>

          <button onClick={addLabelValue} type="submit" className="w-[20%] bg-black text-white text-sm">Add</button>
        </div>
      }

      {
        (curElem?.inputType === "checkbox" || curElem?.inputType === "radio" || curElem?.inputType === "select")
        &&
        (curElem?.otherInput?.length > 0) 
        &&
        
        <div>
          <table className="table-auto mt-4">
            <thead >
              <tr className="text-sm">
                <th className="font-normal border border-black p-2">Label</th>
                <th className="font-normal border border-black p-2">Value</th>
              </tr>
            </thead>
            <tbody>
          {
            curElem?.otherInput?.map((curElem, index) => {
              return (
                <tr className="text-sm border">
                  <td className="m-1 border border-black p-2">{curElem.label}</td>
                  <td className="m-1 border border-black p-2">{curElem.value}</td>
                </tr>
              )
            })
          }
          </tbody>
          </table>
        </div>
        
        
      }

    </div>
  )
}
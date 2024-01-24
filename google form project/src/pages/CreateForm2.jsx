import React, { useId, useState } from 'react'
import { useNavigate } from "react-router-dom"

const CreateForm2 = () => {

  const [data, setData] = useState({ formTitle: "Form Title", formDesc: "", formData: [] });
  const [typeChange, setTypeChange] = useState("text");
  const navigate = useNavigate();

  // ADD QUESTION FUNCTION 
  const addQuestion = (e) => {
    e.preventDefault();
    let inputToAdd = {
        inputType: "text",
        question: "",
        otherInput: []
    }      
    setData({
      ...data,
      formData: [...data.formData, inputToAdd]
    })
  }

  // HANDLECHANGE FUNCTION FOR DATA INPUTS
  const handleChange = (e, index) => {
    const {name, value} = e.target;
    setData({
      ...data,
      formData: data?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            question: e.target.value,
          }
        }
        return curElem
      })
    })
  }

  // SELECT TYPE CHANGE FUNCTION
  const typeChangeFunction = (e, index) => {
    const {name, value} = e.target;
    setData({
      ...data,
      formData: data?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            inputType: value,
            otherInput: [],
          }
        }
        return curElem
      })
    })
  }

  // ADD LABEL VALUE FIELD FUNCTION
  const addLabelValueField = (e, index) => {
    const {name, value} = e.target;
    setData({
      ...data,
      formData: data?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            otherInput: [ ...curElem.otherInput, {label: "", value: ""}],
          }
        }
        return curElem
      })
    })
  }

  // LABEL VALUE HANDLE CHANGE
  const labelValueHandleChange = (e, index, labValIndex) => {
    const {name, value} = e.target;
    setData({
      ...data,
      formData: data?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            otherInput: curElem.otherInput.map((curElemxxx, indexxx) => {
              if (indexxx === labValIndex) {
                return {
                  ...curElemxxx,
                  [name]: value,
                }
              }
              return curElemxxx;
            }),
          }
        }
        return curElem
      })
    })
  }

  // label value delete under 
  const labelValueDelete = (e, index, labValIndex) => {
    setData({
      ...data,
      formData: data?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            otherInput: curElem.otherInput.filter((curElemz, indexz) => labValIndex!==indexz ),
          }
        }
        return curElem
      })
    })
  }

  // SUBMIT GOOGLE FORM
  const submitGoogleForm = (e) => {
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

  const removeField = (e, index) => {
    e.preventDefault();
    setData({
      ...data,
      formData: data?.formData?.filter((curElem, indexx) => index!==indexx)
    })
  }


  // console.log(typeChange);
  // console.log(data);

  return (
    <>      
      <div className="flex flex-col py-10 px-5 md:px-[15%]">
        {/* <h1 className="mb-8 bg-gray-200 px-4 py-4 border-l-8 border-sky-950 text-lg">Create form</h1> */}

        {/* ORIGINAL FORM  */}
        <form className="flex flex-col gap-3" onSubmit={submitGoogleForm}> {/*onSubmit={createGoogleForm}*/} 
          

            {/* Title & Description */}
            <div className="flex flex-col w-full shadow-xl mb-4">
              <input onChange={(e) => setData({...data, formTitle: e.target.value})} value={data?.formTitle} name="formTitle" type="text" placeholder="Form title" className="text-lg p-2 outline-none bg-gray-200" />
              <textarea onChange={(e) => setData({...data, formDesc: e.target.value})} value={data?.formDesc} name="formDesc" cols="30" rows="3" placeholder="Form Description..." className="text-sm p-2 outline-none shadow-xl shadow-gray-400"></textarea>
            </div>


            {/* For Text, Textarea, Number, Date */}
            {
              data?.formData?.map((curElem, index) => {
                let name = `name${index}`;
                let selName = `selName${index}`;
                return (
                  <div key={index} className="flex flex-col w-full shadow-xl shadow-gray-400 mb-3">
                    <div className="flex flex-row">
                      <input type="text" value={curElem?.question} onChange={(e) => handleChange(e, index)} name={name} placeholder="Question" className="text-sm w-[70%] p-2 outline-none bg-gray-200" />
                      <select name={selName} value={curElem?.inputType} className="w-[30%] bg-gray-300 p-2 text-sm outline-none" onChange={(e) => typeChangeFunction(e, index)}>
                          <option value="text">Short answer (text)</option>
                          <option value="textarea">Textarea</option>
                          <option value="number">Number</option>
                          <option value="date">Date</option>
                          <option value="radio">Radio</option>
                          <option value="checkbox">Checkbox</option>
                          <option value="select">Select option (Dropdown)</option>
                      </select>
                    </div>
                    <div className="p-2 pb-3 pt-4">
                      {
                        (curElem?.inputType === "text" || curElem?.inputType === "textarea" || curElem?.inputType === "number" || curElem?.inputType === "date")
                        ?
                        <div className="w-full flex flex-row justify-between">
                          <span className="text-sm text-gray-500 cursor-not-allowed">{curElem?.inputType}</span>
                          <button type="button" className="text-xl bg-gray-300 text-red-500 m-[-2px] px-1" onClick={(e) => removeField(e, index)}>&#10799;</button>
                        </div>
                        :
                        <div>
                          {
                            curElem?.otherInput.length > 0 && curElem?.otherInput.map((curElemx, indexx) => {
                              let type = curElem?.inputType==="checkbox" ? "checkbox" : curElem?.inputType==="radio" ? "radio" : "text";
                              return (
                                <p className="mb-3" key={indexx}>
                                  <input type={type} disabled={true} className="mr-3 w-3" value={type==="text" && indexx} />
                                  <input type="text" name="label" value={curElemx?.label} onChange={(e) => labelValueHandleChange(e, index, indexx)} placeholder="Label" className="text-sm p-2 outline-none bg-gray-300 mr-3" />
                                  <input type="text" name="value" value={curElemx?.value} onChange={(e) => labelValueHandleChange(e, index, indexx)} placeholder="Value" className="text-sm p-2 outline-none bg-gray-300" />
                                  <button type="button" onClick={(e) => labelValueDelete(e, index, indexx)} className="px-2 text-2xl">&#10799;</button>
                                </p>
                              )
                            })
                          }
                          
                          <div className="my-2 ml-6 flex flex-row justify-between">
                            <button type="button" onClick={(e) => addLabelValueField(e, index)} className="text-sm bg-black text-white p-2">Add Another Field</button>
                            <button type="button" className="text-2xl bg-gray-300 text-red-500 px-2" onClick={(e) => removeField(e, index)}>&#10799;</button>
                          </div>
                        </div>
                      }
                        
                    </div>  
                  </div>
                )
              })
            }
            
            <div>
              <button type="button" onClick={addQuestion} className="bg-black text-white text-sm p-2 my-2 mr-5">Add Question</button>
              <button type="submit" className="bg-black text-white text-sm p-2 my-2">Submit</button>            
            </div>
        </form>

      </div>
    </>
  )
}

export default CreateForm2
import React, { useId, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"

const CreateForm2 = () => {

  // const [data, setData] = useState({ formTitle: "Form Title", formDesc: "", formData: [] });
  const uniqueId = `${Date.now()}`;
  const dataRef = useRef({ uniqueId: uniqueId, formTitle: "Form Title", formDesc: "", formData: [] });
  const [render, setRender] = useState(false);
  console.log(dataRef);

  // const [typeChange, setTypeChange] = useState("text");
  const navigate = useNavigate();

  // ADD QUESTION FUNCTION 
  const addQuestion = (e) => {
    e.preventDefault();
    let inputToAdd = {
        id: Date.now(), 
        inputType: "text",
        question: "",
        required: false,
        otherInput: []
    }      
    dataRef.current = {
      ...dataRef.current,
      formData: [...dataRef.current?.formData, inputToAdd]
    } 
    // setData({
    //   ...data,
    //   formData: [...data.formData, inputToAdd]
    // })
    setRender(!render);
  }

  // HANDLECHANGE FUNCTION FOR DATA INPUTS
  const handleChange = (e, index) => {
    const {name, value} = e.target;
    dataRef.current = {
      ...dataRef.current,
      formData: dataRef.current?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            question: value,
          }
        }
        return curElem
      })
    }
    // setData({
    //   ...data,
    //   formData: data?.formData?.map((curElem, indexx) => {
    //     if (index === indexx) {
    //       return {
    //         ...curElem,
    //         question: e.target.value,
    //       }
    //     }
    //     return curElem
    //   })
    // })
  }

  // SELECT TYPE CHANGE FUNCTION
  const typeChangeFunction = (e, index) => {
    const {name, value} = e.target;
    dataRef.current = {
      ...dataRef.current,
      formData: dataRef.current?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            inputType: value,
            otherInput: [],
          }
        }
        return curElem
      })
    }
    setRender(!render)

    // setData({
    //   ...data,
    //   formData: data?.formData?.map((curElem, indexx) => {
    //     if (index === indexx) {
    //       return {
    //         ...curElem,
    //         inputType: value,
    //         otherInput: [],
    //       }
    //     }
    //     return curElem
    //   })
    // })
  }

  // ADD LABEL VALUE FIELD FUNCTION
  const addLabelValueField = (e, index) => {
    const {name, value} = e.target;
    dataRef.current = {
      ...dataRef.current,
      formData: dataRef.current?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            otherInput: [ ...curElem.otherInput, {id: Date.now(), label: "", value: ""}],
          }
        }
        return curElem
      })
    }
    setRender(!render)

    // setData({
    //   ...data,
    //   formData: data?.formData?.map((curElem, indexx) => {
    //     if (index === indexx) {
    //       return {
    //         ...curElem,
    //         otherInput: [ ...curElem.otherInput, {label: "", value: ""}],
    //       }
    //     }
    //     return curElem
    //   })
    // })
  }

  // LABEL VALUE HANDLE CHANGE
  const labelValueHandleChange = (e, index, labValIndex) => {
    const {name, value} = e.target;
    dataRef.current = {
      ...dataRef.current,
      formData: dataRef.current?.formData?.map((curElem, indexx) => {
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
    }

    // setData({
    //   ...data,
    //   formData: data?.formData?.map((curElem, indexx) => {
    //     if (index === indexx) {
    //       return {
    //         ...curElem,
    //         otherInput: curElem.otherInput.map((curElemxxx, indexxx) => {
    //           if (indexxx === labValIndex) {
    //             return {
    //               ...curElemxxx,
    //               [name]: value,
    //             }
    //           }
    //           return curElemxxx;
    //         }),
    //       }
    //     }
    //     return curElem
    //   })
    // })
  }

  // label value delete under 
  const labelValueDelete = (e, index, labValIndex) => {
    const {name, value} = e.target;
    console.log(labValIndex);
    dataRef.current = {
      ...dataRef.current,
      formData: dataRef.current?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            otherInput: curElem.otherInput.filter((curElemz, indexz) => labValIndex!==indexz ),
          }
        }
        return curElem
      })
    }
    setRender(!render);

    // setData({
    //   ...data,
    //   formData: data?.formData?.map((curElem, indexx) => {
    //     if (index === indexx) {
    //       return {
    //         ...curElem,
    //         otherInput: curElem.otherInput.filter((curElemz, indexz) => labValIndex!==indexz ),
    //       }
    //     }
    //     return curElem
    //   })
    // })
  }

  // SUBMIT GOOGLE FORM
  const submitGoogleForm = (e) => {
    e.preventDefault();
    setRender(!render);
    if (localStorage.getItem("googleForm")) {
      let gfData = JSON.parse(localStorage.getItem("googleForm"));
      localStorage.setItem("googleForm", JSON.stringify([...gfData, dataRef.current]));
    } else {
      localStorage.setItem("googleForm", JSON.stringify([dataRef.current]));
    }
    console.log("Submitted data", dataRef);
    setTimeout(() => {
      navigate("/")
    }, 100)
  }

  // REMOVE FIELD
  const removeField = (e, index) => {
    e.preventDefault();
    dataRef.current = {
      ...dataRef.current,
      formData: dataRef.current?.formData?.filter((curElem, indexx) => index!==indexx)
    }
    setRender(!render);

    // setData({
    //   ...data,
    //   formData: data?.formData?.filter((curElem, indexx) => index!==indexx)
    // })
  }

  // REQUIRING FIELD HANDLECHANGE FUNCTION
  const requiredField = (e, index) => {
    const {checked} = e.target;
    
    dataRef.current = {
      ...dataRef.current,
      formData: dataRef.current?.formData?.map((curElem, indexx) => {
        if (index === indexx) {
          return {
            ...curElem,
            required: checked ? true : false,
          }
        }
        return curElem
      })
    }

    // setData({
    //   ...data,
    //   formData: data?.formData?.map((curElem, indexx) => {
    //     if (index === indexx) {
    //       return {
    //         ...curElem,
    //         required: checked ? true : false,
    //       }
    //     }
    //     return curElem
    //   })
    // })
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
              <input onChange={(e) => dataRef.current = { ...dataRef.current, formTitle: e.target.value}} name="formTitle" type="text" placeholder="Form title" className="text-lg p-2 outline-none bg-gray-200" />
              <textarea onChange={(e) => dataRef.current = { ...dataRef.current, formDesc: e.target.value}} name="formDesc" cols="30" rows="3" placeholder="Form Description..." className="text-sm p-2 outline-none shadow-xl shadow-gray-400"></textarea>
            </div>

            {/* For Text, Textarea, Number, Date */}
            {
              dataRef.current?.formData?.map((curElem, index) => {
                let name = `name${index}`;
                let selName = `selName${index}`;
                return (
                  <div key={curElem?.id} className="flex flex-col w-full shadow-xl shadow-gray-400 mb-3">
                    <div className="flex flex-row">
                      <input type="text" onChange={(e) => handleChange(e, index)} name={name} placeholder="Question" className="text-sm w-[70%] p-2 outline-none bg-gray-200" />
                      <select name={selName} className="w-[30%] bg-gray-300 p-2 text-sm outline-none" onChange={(e) => typeChangeFunction(e, index)}>
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
                          <span className="flex flex-row">
                            <span className="px-2 pt-2 pb-1 mr-1 flex flex-row justify-center">
                              <span className="text-xs mr-2">Required</span>
                              <input type="checkbox" onChange={(e) => requiredField(e, index)} />
                            </span>
                            <button type="button" className="text-xl bg-gray-300 text-red-500 m-[-2px] px-2" onClick={(e) => removeField(e, index)}>&#10799;</button>
                          </span>
                        </div>
                        :
                        <div>
                          {
                            curElem?.otherInput.length > 0 && curElem?.otherInput.map((curElemx, indexx) => {
                              let newKey = `key-${indexx}`;
                              let type = curElem?.inputType==="checkbox" ? "checkbox" : curElem?.inputType==="radio" ? "radio" : "text";
                              return (
                                <p className="mb-3" key={curElemx?.id}>
                                  <input type={type} disabled={true} className="mr-3 w-3" value={type==="text" && indexx} />
                                  <input type="text" name="label" onChange={(e) => labelValueHandleChange(e, index, indexx)} placeholder="Label" className="text-sm p-2 outline-none bg-gray-300 mr-3" />
                                  <input type="text" name="value" onChange={(e) => labelValueHandleChange(e, index, indexx)} placeholder="Value" className="text-sm p-2 outline-none bg-gray-300" />
                                  <button type="button" onClick={(e) => labelValueDelete(e, index, indexx)} className="px-2 text-2xl">&#10799;</button>
                                </p>
                              )
                            })
                          }
                          
                          <div className="my-2 ml-6 flex flex-row justify-between">
                            <button type="button" onClick={(e) => addLabelValueField(e, index)} className="text-sm bg-black text-white p-2">Add Another Field</button>
                            <div className="flex flex-row">
                              <span className="px-2 pt-2 pb-1 mr-1 flex flex-row justify-center items-center">
                                <span className="text-xs mr-2">Required</span>
                                <input type="checkbox" onChange={(e) => requiredField(e, index)} />
                              </span>
                              <button type="button" className="text-2xl bg-gray-300 text-red-500 px-2" onClick={(e) => removeField(e, index)}>&#10799;</button>
                            </div>
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
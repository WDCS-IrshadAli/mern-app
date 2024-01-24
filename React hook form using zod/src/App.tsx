import { useForm } from 'react-hook-form'
import './App.css'
import { useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

function App() {

  //useForm State (react-hook-form)
  const { register, handleSubmit, reset, formState: {errors} } = useForm<formDt>({
    defaultValues: { name: "", username: "", email: "", age: 0, password: "", gender: "female", country: "portugal" },
    resolver: zodResolver(schemaValidationZod),
  });  
  
  //onSubmit (handlesubmit(onsubmit))
  const onSubmit = (data: formDt): void => {
    console.log("submitted data = ", data);
    alert("User registered successfully !")
    reset();
  }

  console.log(errors);

  return (
    <>
      <h1>FORM</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="name" type="text" register={register} errors={errors.name} />
        <Input label="username" type="text" register={register} errors={errors.username} />
        <Input label="email" type="email" register={register} errors={errors.email} />
        <Input label="age" type="number" register={register} errors={errors.age} valueAs="number" />
        <Input label="password" type="password" register={register} errors={errors.password} />
        <Input label="gender" type="radio" register={register} errors={errors.gender} radio={["male", "female"]} />
        <Input label="country" type="checkbox" register={register} errors={errors.country} checkbox={["mexico", "spain", "portugal"]} />
        <Input label="date" type="date" register={register} errors={errors.date} />
        {/* <div>
          <label>name</label>
          <input type="text" {...register("name")} />
          {errors.name && <span style={{ color: "tomato", fontSize: "12px", fontWeight: "bold" }}>{errors.name.message}</span>}
        </div> */}
        <button type="submit" disabled={Object.keys(errors).length !== 0}>Submit</button>
      </form>      
    </>
  )
}

export default App

//SCHEMA VAIDATION
// export const schemaValidationZod: z.ZodType<SchemaZod> = z.object({
// interface SchemaZod {
//   name: string,
//   username: string,
//   email: string,
//   age: number,
//   password: string  
// }
type formDt = z.infer<typeof schemaValidationZod>
export const schemaValidationZod = z.object({
  name: z.string({ invalid_type_error: "Invalid Data Type" }).trim().refine((text) => text.trim() !== "", {message: "Name cannot be empty !"}),
  username: z.string().trim().min(3).max(20),
  email: z.string().trim().email(),
  age: z.number().int().gt(18).lt(100),
  password: z.string().trim().min(8).max(30),
  gender: z.enum(["male", "female"]),
  country: z.enum(["mexico", "spain", "portugal"]),
  date: z.date(),
});


//Input Custom Component
interface InputProps { 
  label: string, 
  type: string, 
  register: any, 
  errors: any, 
  valueAs?: any, 
  radio?: any,
  checkbox?: any                                    
}
export const Input: React.FC<InputProps> = ({ label, type, register, errors, valueAs, radio, checkbox }: InputProps) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label.charAt(0).toUpperCase() + label.slice(1)}</label>
      {
        type === "radio"
        ?
        <>
          {
            radio?.map((curElem: any, index: number) => { 
              const radioId = useId();
              return (
                <div key={index}>
                  <label htmlFor={radioId}>{curElem.charAt(0).toUpperCase() + curElem.slice(1)}</label>
                  <input type={type} id={radioId} value={curElem} {...register(label, valueAs === "number" && {valueAsNumber: true})} />
                </div>
              )
            })
          }
        </>
        :
        type === "checkbox"
        ?
        <>
          <select type={type} id={id} {...register(label, valueAs === "number" && {valueAsNumber: true})}>
            {
              checkbox?.map((curElem: any, index: number) => {
                return (<option key={index} value={curElem}>{curElem}</option>)
              })
            }
          </select>
        </>
        :
        type === "date"
        ?
        <input type={type} placeholder={label} id={id} {...register(label, {valueAsDate: true})} />
        :
        <input type={type} placeholder={label} id={id} {...register(label, valueAs === "number" && {valueAsNumber: true})} />
      }
      {errors && <span style={{ color: "tomato", fontSize: "12px", fontWeight: "bold" }}>{errors.message}</span>}
    </div>
  )
}
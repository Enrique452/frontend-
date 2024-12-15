/* eslint-disable react-hooks/rules-of-hooks */

import { useForm } from "react-hook-form" ;
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp} from "react-icons/io5";
import ReCaptcha from 'react-google-recaptcha';

function loginPage() {
  const {register, handleSubmit, formState:{errors},} = useForm();
  const {signin, isAuthenticated,  errors: loginErrors} = useAuth();
  const[passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null)

  const togglePasswordVisibility =()=>{
    setPasswordShown(passwordShown ? false: true)
  }
const navigate = useNavigate();


useEffect( ()=>{ 
  if(isAuthenticated)
    navigate('/products');
  
  else
  console.log('No esta autenticado');

}, [isAuthenticated, navigate])
  

  const onSubmit = handleSubmit((data) =>{
  // console.log(values);
    signin(data);
  });
return (
  <div className="flex items-center justify-center h-screen">
  <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
  <h1 className="text-2xl font-bold mb-10 text-center">LOGIN</h1>
  
  {
    loginErrors.map((error, i) => (
  <div className="bg-red-500 p-2 my-2 text-white" key={i}>
    {error}
  </div>
))}

  <form onSubmit={onSubmit}>
  <label htmlFor="email">Email</label>
      <input type="email"
       className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
       placeholder="Email"
       {
          ...register("email", {required: true})
                                 
       }
  />
      { 
      errors.email && (
        <p className="text-red-500">Email es requerido </p>
      )}
      <label htmlFor="password">Password</label>
      <div className="flex justify-end items-center relative "> 
      <input type={passwordShown? "text": "password"}

        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        placeholder="Password"

       {
       
       ...register("password",{required: true, minLength: 6})
       }
       />
       {
        passwordShown? <IoEyeSharp size={30} className="absolute mr-2 w-10"
                  onClick={togglePasswordVisibility} />
                  :
                  <IoEyeOffSharp size={30} className="absoluete mr-2 w-10"
                  onClick={togglePasswordVisibility} />
       }

      { errors.password?.type==='required' &&(
        <p className="text-red-500">Password requerido  </p>
      )}
       { errors.password?.type==='minLength' &&(
        <p className="text-red-500">La longitud minima es de 6 caracteres  </p>
      )}
      </div>
      <br></br>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
            type="submit"
            disabled={!captchaValue}
            
            
            >
  
              <IoLogIn size={30}/>
                
        </button>
        <br></br>
        <br></br>

        <ReCaptcha 
          sitekey="6LfFRo4qAAAAAKxtEXJhPpBNev7q_8TycAasdEOS"
          onChange={ (value)=> setCaptchaValue(value)}
        
        />





    </form>
    <p className="flex gap-x2 justify-between pt-5 mt-5">
      No tienes una cuenta?
      
      <Link  to='/register' className='text-sky-500' >!Crea una 
      <IoPersonAdd size={30} className="mx-1"/></Link>
    </p> 
  </div>
  </div>

)
}
export default loginPage;

/* eslint-disable no-irregular-whitespace */
import { useForm } from "react-hook-form" ;
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import {useNavigate, Link} from 'react-router-dom';
import { IoPersonAdd, IoLogIn } from "react-icons/io5";
import ReCaptcha from 'react-google-recaptcha';



function RegisterPage() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signup, isAuthenticated, errors:registerErrors} = useAuth();
    const [captchaValue, setCaptchaValue] = useState(null)
    const navigate = useNavigate();

    useEffect( ()=>{
      if(isAuthenticated)
        navigate('/products')
      else
      console.log ("No essta autenticado");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated] )

    const onSubmit = handleSubmit(async (values)=>{
    //  console.log(values);
        signup(values);
    })
  return (
    <div className="flex items-center justify-center h-screen">
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      {
        registerErrors.map((error, i) =>(
          <div className="bg-red-500 p-2 my-2 text-white" key={i}>
            {error}
      </div>
        ))
      }
      <form onSubmit={onSubmit} >
        <h1 className="text-2x1 text-center font-bold my-4">Registrar Usuario </h1>
        <label htmlFor="username">Usuario </label>
        <input type="text" 
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder="Username"
        {
                ...register("username",{required: true, minLength: 5})
            }
        />
        { errors.username?.type==='required' &&(
          <p className="text-red-500">Nombre de usuario requerido </p>
        )}

        { errors.username?.type==='minLength' &&(
          <p className="text-red-500">La longitud minima es de 5 caracteres  </p>
        )}
        <label htmlFor="email">Email </label>
        <input type="email"
         className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
         placeholder="Email"

         {
            ...register("email", {required: true,
                                    pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                       message: 'Por favor introduce un email válido',
                                       },
            })
         }
         
         />

        { 
        errors.email?.type==='required' && (
          <p className="text-red-500">Email es requerido </p>
        )}
       { errors.email?.message &&(
          <p className="text-red-500">Email es requerido </p>
        )}
        
        <label htmlFor="password">Password </label>
        <input type="password"

          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder="Password"

         {
         
         ...register("password",{required: true, minLength: 6})
         }
         />

        { errors.password?.type==='required' &&(
          <p className="text-red-500">Password requerido  </p>
        )}
         { errors.password?.type==='minLength' &&(
          <p className="text-red-500">La longitud minima es de 6 caracteres  </p>
        )}
        <br></br>
        <br></br>


         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
         type="submit"
         disabled={!captchaValue}
         
         >
          <IoPersonAdd size={30}/>
          </button>
          <br></br>
          <br></br>

          <ReCaptcha 
          sitekey="6LfFRo4qAAAAAKxtEXJhPpBNev7q_8TycAasdEOS"
          onChange={ (value)=> setCaptchaValue(value)}
        
        />


      </form>

    <p className="flex gap-x-2 justify-between pt-5 mt-5">
          Ya tienes una cuenta?
          <Link to="/login" className="text-sky-500">
          <div className="flex mx-2 px-2 items-start">     
               !Inicia sesion
            <IoLogIn size={30} className="mx-1"/>
            
            </div>
  
          </Link>
    </p>
    </div>
    </div>

  )
}

export default RegisterPage;

import React, { useState } from 'react'
import { useFormik } from 'formik'
import values from './../../../node_modules/lodash-es/values';
import {useNavigate} from 'react-router-dom'
import * as yup from 'yup';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'




//  const mySchema = yup.object( {
//   name: yup.string().required("Name is requred").min(3 ," at least 3  characters").max(10 ,"maximum 10 characters"),
//   phone:  yup.string().required("Phone is requred").matches(/^01[0125][0-9]{8}$/ ,"you must  Enter Egyption Numper"),
//   email:  yup.string().required("Email is requred").email("Invalid Email"),
//  password: yup.string().required("Password is requred").min(6,"at least 6 characters"),
//  rePassword: yup.string().required("rePassword is requred"),
// })


const mySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "At least 3 characters")
    .max(10, "Maximum 10 characters"),
    
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^01[0125][0-9]{8}$/, "You must enter a valid Egyptian number"),
    
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email"),
    
  password: yup
    .string()
    .required("Password is required")
    .min(6, "At least 6 characters"),
    
  rePassword: yup
    .string()
    .required("Re-entering the password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});


export default function Register() {

  const userData ={
    name:'',
    phone:'',
    email: '',
    password:'',
    rePassword:'',
   
  };

  const[isSuccess , setIsSuccess]= useState( false);
  const[errMessage , setErrMessage]= useState( undefined);
  const[isLoading , setIsLoading]= useState( false);
    const navigate=  useNavigate() ;




    function mySubmit( values){

      setIsLoading(true);


    console.log("submitted..........." , values);

      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)

      .then( (res) => {
    
      console.log(" in case of success" , res);
          setIsSuccess(true);

          setTimeout( function() {
            setIsSuccess(false);
            navigate('/Login')
            
          }  , 2000)

          setIsLoading(false);

         
   })

   .catch( (error) => {
    console.log(" in case of error" , error);
    setErrMessage(error.response.data.message);
    setTimeout(function(){
      setErrMessage(undefined);
    } ,2000)

    setIsLoading(false);
   })
   
    
    
  }


 const myFormik= useFormik( {
  initialValues: userData ,
  onSubmit : mySubmit ,
  validationSchema : mySchema ,

  // validate: function(values){

  //   const errors ={};

  //   const nameRegex =/^[A-Z][a-z]{2,9}$/;
  //   const phoneRegex =/^01[0125][0-9]{8}$/;

  //   if(nameRegex.test(values.name) === false){
  //     errors.name ="Name Must be (3-10) Character Starts With Capital Letter"
  //   }

  //   if(values.email.includes("@") === false || values.email.includes(".") === false) {
  //     errors.email ="Email must be in format"
  //   }

  //   if(phoneRegex.test(values.phone) === false){
  //     errors.phone = "Phone must be an Egption Number"
  //   }
    
  //   if(values.password.length < 6 || values.password.length > 12  ){
  //     errors.password = " password must be from 6 to 12 characters"
  //   }
  //   if(values.rePassword !== values.password){
  //     errors.rePassword ="Password and Repassword don't Match";
  //   }


  //   return errors
  // }


})



  return (
    <>
    
      <div className='w-75 m-auto'>
        <h2> Register Now :</h2>
        { isSuccess? <div className="alert alert-success text-center"> Congratulations!  your account has been created  </div> : ''}
        {errMessage ? <div className="alert alert-danger text-center"> {errMessage} </div> : ''}


        
          
        <form  onSubmit={myFormik.handleSubmit}>

          <label htmlFor="name"> name:</label>
          <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.name}  id='name' type="text" className=' form-control mb-2 mt-2' />
          {myFormik.errors.name && myFormik.touched.name ? <div className=' alert alert-danger'> {myFormik.errors.name} </div> : ""}


          <label htmlFor="phone"> phone:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone}  id='phone' type="text" className=' form-control mb-2 mt-2' />
          {myFormik.errors.phone && myFormik.touched.phone ?<div className=' alert alert-danger'> {myFormik.errors.phone} </div> : ""}


          <label htmlFor="email"> email:</label>
          <input  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email}  id='email' type=" email" className=' form-control mb-2 mt-2' />
          {myFormik.errors.email && myFormik.touched.email ? <div className=' alert alert-danger'> {myFormik.errors.email} </div> : ""}


          <label htmlFor="password"> password:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password}  id='password' type="password" className=' form-control mb-2 mt-2' />
          {myFormik.errors.password && myFormik.touched.password ?<div className=' alert alert-danger'> {myFormik.errors.password} </div> : ""}

         
          <label htmlFor='rePassword'> rePassword </label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} id='rePassword' className=' form-control mb-2 mt-2' type="password" />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ?<div className=' alert alert-danger'> {myFormik.errors.rePassword} </div> : ""}

          
          <button type='submit' className='m-3 btn bg-main p-3 text-white  rounded-3'> 
            {isLoading? <TailSpin
  visible={true}
  height="30"
  width="30"
  color="#fff"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  /> : "Register"}

             </button>

        </form>

      </div>
    </>
  )
}

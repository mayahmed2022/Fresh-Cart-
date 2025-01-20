import React from 'react'
import {jwtDecode} from 'jwt-decode';
import {Helmet} from "react-helmet";


export default function MyProfile() {

   
   const userData= jwtDecode( localStorage.getItem('tkn'))
   
  return<>
  <Helmet>
    <title> profile</title>
  </Helmet>
  <div className=" bg-black bg-opacity-50  d-flex justify-content-center align-items-center vh-100">
  <div className="container w-50 m-auto bg-body-secondary border-opacity-75  border  border-success">
    <h3 className='text-center m-5 text-main'>
       Hello ya  {userData.name}
    </h3> 
   
    
  </div>
  </div>
 
  </>
}

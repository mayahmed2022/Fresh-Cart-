import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'; 
import { TailSpin } from 'react-loader-spinner';


export default function BrandsDetails() {
    const {id} =useParams();

    function getProductDetails(){
        return   axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        }
        const{data,isLoading} =useQuery(`productsDetails-${id}`,getProductDetails);

        if (isLoading) {
              return  <div className=" d-flex justify-content-center align-items-center bg-body vh-100">
                 <TailSpin
                   visible={true}
                   height="80"
                   width="80"
                   color="#4fa94d"
                   ariaLabel="tail-spin-loading"
                   radius="1"
                   wrapperStyle={{}}
                   wrapperClass=""
                 />
               </div>;
             }

  return<>
  <div className="container">
   
    
        <div className="product  m-auto" style={{ height:"300px" ,width:"300px" }}>
        <img className='w-100' src={data.data.data.image} alt={data.data.data.name} />
       

    </div>
  </div>
  </>
}

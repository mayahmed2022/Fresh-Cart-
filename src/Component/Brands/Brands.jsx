import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function Brands() {
  async function getAllsBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
   const { data, isLoading } = useQuery("getAllProducts", getAllsBrands);

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
  return <>
  <div className="container mt-3">
    <div className="row g-2">
     {console.log( "ana data mn brands" , data.data.data)}
     {data.data.data.map( (brand,idx)=> <div key={idx} className="col-md-2">
    <Link  to={`/brandsDetails/${brand._id}`}>
    <div className=' border border-1 border-success-subtle'>
    <img className='w-100' src={brand.image} alt={brand.name} />
      
      {/* <h4 className=' text-center text-main'> {brand.name} </h4> */}
     
      
    </div>
    </Link>

</div>)}
      
    </div>
  </div>
  </>
}

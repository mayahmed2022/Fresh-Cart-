import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner";
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContext';

export default function ProductDetails() {

    
    const {id} =useParams();
    const{addProductToCart}= useContext(cartContext);
    
   async function addMyProduct(id){
    const res = await addProductToCart(id)
    if(res){
      toast.success('Add Successfuly',{duration: 1500 ,position:"top-center"})
    }
    else{
      toast.error('Error Occurred',{duration: 1500 ,position:"top-center"})
    }

    }

     function getProductDetails(){
     return   axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
     }
     const{data,isLoading} =useQuery(`productsDetails-${id}`,getProductDetails);

    // console.log("ana mn elzeft producdetails" ,data?.data.data);
    
     

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

   
     
  return(
    <>

    <Helmet>
      <title>{data.data.data.title} </title>
    </Helmet>
      <div className="container">
        <div className="row align-items-center">
            <div className="col-md-4">
                <figure>
                    <img  className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
                </figure>
              
            </div>



            <div className="col-md-8">
            <article>
                <h1 className='text-center' >{data.data.data.title} </h1>
                <h1 className='text-center' >{data.data.data.id} </h1>

                <p>{data.data.data.description} </p>
                <div className=' d-flex  justify-content-between'>
                {data.data.data.priceAfterDiscount ? (
                      <p className=" ms-2 ">
                        {" "}
                        <span className=" text-decoration-line-through ">
                          {data.data.data.price}
                        </span>{" "}
                        - {data.data.data.priceAfterDiscount}{" "}
                      </p>
                    ) : (
                      <p className=" ms-2"> {data.data.data.price} </p>
                    )}
                </div>
                <button  onClick={()=>addMyProduct(data.data.data.id)} className='btn bg-main text-white w-100'> Add To Cart </button>


       
               </article>
            </div>
        </div>
      </div>
    </>
  ) 
}




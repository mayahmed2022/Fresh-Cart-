import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import {Helmet} from "react-helmet";


export default function AllOrders() {
 const{userId}  = useContext(cartContext);
 const[allOrders , setAllOrders]=useState([])

 function getUserOrders(){
 
    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId} `)
    .then((res)=>{
        console.log("res mn all orders",res.data);
        
        setAllOrders(res.data)
    } ).catch((err)=>{
        console.log("ana error mn get all orders",err);
        

    } )
 }

 useEffect(()=>{
    getUserOrders();
 },[] )

 if(!allOrders){
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
  <Helmet>
    <title> All orders</title>
  </Helmet>
  
 <div className="container w-50 ">
    <h1 className='text-main text-capitalize text-center text-truncate' > All Orders </h1>
    <div className="row">
       
    
    {allOrders.map((order , idx )=>  <div key={idx} className="col-md-12  mt-5">
        <div className="order  bg-body-tertiary">
        <div  className='p-4 d-flex justify-content-between align-content-center'>
               
               <div>
               <h6> <span className='text-main'>Name:</span> {order.user.name} </h6>
               <h6>  <span className='text-main'>Email:</span> {order.user.email} </h6>
               </div>
               <div>
               <h6><span className='text-main'>Phone:</span>   {order.user.phone} </h6>
               <h6><span className='text-main'>City:</span>   {order.shippingAddress.city} </h6>
               </div>
               
           </div>

        <div className="container">
            <div className="row">
            {order.cartItems.map((item , secidx)=> {return  <div key={secidx} className="col-md-4">
                <div className="itema text-center border border-success ">
                    <img className='w-50 mt-3' src={item.product.imageCover} alt={item.product.title} />
                    <h6  > {item.product.title.split( ' ').slice( 0 , 2).join( ' ')}</h6>
                    <h6>  <span className='text-main'>Quantity :</span> {item.count}</h6>
                    <h6> <span className='text-main'>Price:</span>  {item.price}</h6>

</div>
</div>
   

} )}

               
            </div>
               </div>

            
          
             <div className='p-4' >
            <h6 > <span className='text-main'>payment method :</span> :{order.paymentMethodType} </h6>
            <h6> <span className='text-main'>shipping Price:</span> :{order.shippingPrice}</h6>
           < h6> <span className='text-main'>total Order Price :</span>:{order.totalOrderPrice}</h6>
          
            </div>
          
         
           
            
        </div>
    </div>)}
 




        </div>
    </div>
 
  </>
}




























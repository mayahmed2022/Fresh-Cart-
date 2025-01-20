import axios from 'axios'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
    const {cartId ,getUserCart}= useContext(cartContext);
  const nav=  useNavigate();


    function confirmCashPayment(){

        
        const details= document.getElementById('details').value;
        const phone= document.getElementById('phone').value;
        const city= document.getElementById('city').value;
       
        const shippingObject={
           "shippingAddress":{
               "details": details,
               "phone":phone,
               "city": city
               }
            }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,shippingObject ,
            {headers: {token:localStorage.getItem('tkn')}}
        ).then((res)=>{
            toast.success('Payment Completed Successfuly' , { position:"top-center",duration: 1500});
            getUserCart();
            setTimeout(() => {
                nav('/products')
            }, 1500);
        } ).catch((err)=>{
            toast.error('Opps! Error Occurred' , { position:"top-center",duration: 1500})

        } )

    }


    function confirmOnlinePayment(){
        
        const details= document.getElementById('details').value;
        const phone= document.getElementById('phone').value;
        const city= document.getElementById('city').value;

  const shippingObject  ={
            "shippingAddress":{
                "details": details,
                "phone": phone,
                "city": city
                }
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shippingObject,{
            headers: { token: localStorage.getItem('tkn')},
            params: {url: "http://localhost:3000"}
        }).then((res)=>{
            if(res.data.status==="success"){
                window.open(res.data.session.url)
            }
            else{
                toast.error('Opps! An Error Occurred.' , { position:"top-center" , duration: 1500})
            }

        } )
    }





  return <>
 <div className="w-75 m-auto bg-body-secondary "> 
    <h5 className='text-center text-main p-3'> Please inter your information </h5>

 <label className='ps-2' htmlFor="details"> Details: </label>
 <input className=' form-control mb-3 ' id='details' type="text" />

 <label className='ps-2' htmlFor="phone"> Phone: </label>
 <input className=' form-control mb-3 ' id='phone' type="text" />

 <label className='ps-2' htmlFor="city"> City: </label>
 <input className=' form-control mb-3 ' id='city' type="text" />

 <div className=" d-flex justify-content-between align-content-center">
 <button onClick={confirmCashPayment} className=' btn btn-outline-success m-3'> Confirm Cash Payment </button>
 <button onClick={confirmOnlinePayment} className=' btn btn-outline-success m-3'> Confirm online Payment </button>
 </div>
 </div>
  </>
}

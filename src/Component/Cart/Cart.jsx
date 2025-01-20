import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { TailSpin } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default function Cart() {


 const {numOfCartItems ,totalCartPrice ,allProducts ,updateCount ,deleteProduct , clearCart}= useContext(cartContext)
 console.log( allProducts);



 async function updateMyCount(id,newCount){
 const res= await updateCount(id,newCount)
 if(res){
  console.log(res);
  toast.success("product updated successfully" , {position:"top-center", duration: 1500})
 }
 else{
  console.log("error from updateMyCount");
  toast.error("Opps! error Occurrd" , {position:"top-center", duration: 1500})
 }
 }


  async function deleteMyProduct(id){
  const res= await deleteProduct(id);
  if(res){
    toast.success("product deleted successfully" , {position:"top-center", duration: 1500})
  }
  else{
    console.log("error from updateMyCount");
    toast.error("Opps! error Occurrd" , {position:"top-center", duration: 1500})
   }

 }

 async function clearMyCart(){
 const res =await clearCart();
 if(res){
  toast.success("cart Cleared successfully" , {position:"top-center", duration: 1500});
<h1>Cart Empty </h1>

 }
 else{

  toast.error("Opps! error Occurrd" , {position:"top-center", duration: 1500})
 }
  
 }


 if(!allProducts){
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
<Helmet >
  <title> Cart</title>
</Helmet>
  
  <div className="container bg-body-secondary">
    <h1 className=' pt-3 pb-3 text-center'> Shop Cart</h1>

   <div className=" d-flex  justify-content-between align-content-center mb-2" >

   <h4 className='text-main pb-3'> Total Cart Price : {totalCartPrice} LE </h4>

   
   <button onClick={clearMyCart} className=' btn btn-outline-success me-5' > Clear Cart </button>

    
   </div>
    {allProducts.map((product , idx )=>  <div key={idx} className="row  align-items-center  border border-1 border-bottom mb-1 p-2">

<div className="col-md-1">
  
    <figure>
      <img className='w-100' src={product.product.imageCover} alt={product.product.titl} />

    </figure>

</div>

<div className="col-md-8">
  <article>
    <h5>{product.product.title} </h5>
    <h6> price: {product.price}</h6>
    <button  onClick={()=> deleteMyProduct(product.product.id)} className=' btn  btn-outline-success text-black'> <span className='text-main'><i class="fa-solid fa-trash"></i> </span> Remove </button>

  </article>

</div>

<div className="col-md-2 d-flex  justify-content-center align-content-center">
  <button  onClick={()=> updateMyCount(product.product.id , product.count + 1)} className=' btn btn-outline-success text-black'> + </button>
  <p className='ps-2 pe-2'> {product.count} </p>
  <button  disabled={product.count  == 1} onClick={()=> updateMyCount(product.product.id , product.count - 1)} className=' btn btn-outline-success text-black'> - </button>
 

</div>

</div>)}

<Link to='/payment'>
<div className=' d-flex justify-content-center align-content-center' >
<button className='btn btn-outline-success m-4 text-center' type="button">Confirm Payment </button>
</div>

</Link>


    </div> 
  </>
    
}


import axios from 'axios';
import React, { createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
import { authContext } from './AuthContext';
export const cartContext = createContext();


export default function CartContextProvider({ children }) {

    const{myToken} =useContext(authContext)

    const[numOfCartItems,setNumOfCartItems]=useState(0);
     const[totalCartPrice,setTotalCartPrice]= useState(0);
     const[allProducts,setAllProducts]= useState(null);
     const[cartId , setCartId]= useState(null);
     const[userId , setUserId]= useState(null);

function getUserCart(){
  axios.get('https://ecommerce.routemisr.com/api/v1/cart',{ 
    headers:{ token: localStorage.getItem('tkn')}
  }).then((res)=>{
    console.log("ana res mn getUserCart" , res);
    setNumOfCartItems(res.data.numOfCartItems);
    setTotalCartPrice(res.data.data.totalCartPrice);
    setAllProducts(res.data.data.products);
    setCartId(res.data.cartId);
    setUserId(res.data.data.cartOwner)

  } ).catch((err)=>{
    console.log( "ana err mn getUserCart", err);
    
  } )
}

useEffect(()=>{
  getUserCart();
},[ myToken ] )



  async function addProductToCart(id) {
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: id },
        {
          headers: { token: localStorage.getItem('tkn') },
        }
      );
      console.log('ana result', res);
      // setNumOfCartItems(res.data.numOfCartItems);
      // setTotalCartPrice(res.data.data.totalCartPrice);
      // setAllProducts(res.data.data.products);
      getUserCart();
      return true; // في حالة النجاح
    } catch (err) {
      console.log('ana error', err);
      return false; // في حالة الخطأ
    }
  }


  async function updateCount(id,newCount){
  const booleanFlag =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { "count": newCount },
    {headers: {token:localStorage.getItem('tkn')}}
  ).then((res)=>{
    console.log("ana res mn updateCount",res);
    setNumOfCartItems(res.data.numOfCartItems);
    setTotalCartPrice(res.data.data.totalCartPrice);
    setAllProducts(res.data.data.products);
    return true;


  } ).catch((err)=>{
    console.log("ana error mn updateCount",err);
    return false;
   
  } )
  return booleanFlag;
  }



async  function deleteProduct(id){
  const booleanFlag= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {headers: {token: localStorage.getItem('tkn')}}
    ).then((res)=>{
      console.log("res mn delete product" , res);
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setAllProducts(res.data.data.products);
      return true ;
    } ).catch((err )=>{
      console.log("err mn delete product" , err);

      return false;

    } )
  return booleanFlag;
  }


  async function clearCart(){
   const booleanFlag = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart' ,
      {headers: { token: localStorage.getItem('tkn')}}
    ).then((res)=>{
      console.log("res mn clearCart" , res);
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setAllProducts([]);
      return true;
      
    } ).catch((err)=>{
      console.log("err mn clearCart" , err);
      return false;

    } )
    return booleanFlag;
  }


  // تمرير addProductToCart في سياق
  return (
    <cartContext.Provider value={{ addProductToCart ,
      numOfCartItems ,
      totalCartPrice ,
      allProducts ,
      deleteProduct,
      updateCount,
      clearCart,
      cartId ,
      getUserCart ,
      userId
    }}>
      {children}
    </cartContext.Provider>
  );
}
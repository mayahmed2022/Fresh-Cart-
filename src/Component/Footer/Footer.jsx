import React from 'react'

export default function Footer() {
  return <>
  <div className="bg-body-secondary mt-5 " style={{height:"400px"}}>
  <div className='container '>

    <h2 className='pb-2 pt-5'> Get The Fresh Cart App</h2>
    <h6 className=' text-black-50 pb-3'> We Will Send You A Link  , Open it in Your Phone To Dowenload The App .. </h6>


      <div className="row">

        <div className="col-md-8">
        <input type="text"  className=' form-control '  placeholder='Email' />
        </div>

        <div className="col-md-4">
        <button className=' btn btn-success'> Share App Link</button>
        </div>

    </div>


    <div className='payment mt-5 mb-5 shadow p-3' >
      <div className="row  d-flex justify-content-between">

        <div className="col-md-4">
          <div className=' d-flex   justify-content-center align-items-center '>
          <div><h6 className='me-4'> Payment Partners</h6></div>

          <div className="images d-flex justify-content-center align-items-center">

                  <img src={require('../../images/images Footer/amazon.jpg')} className='m-1' style={{height:"40px" , width:"50px"}} alt="Amazon Logo" />
                  <img src={require('../../images/images Footer/paypal.jpg')} className='m-1' style={{height:"40px" , width:"50px"}} alt="PayPal Logo" />
                    <img src={require('../../images/images Footer/american.jpg')} className='m-1' style={{height:"40px" , width:"50px"}} alt="American Logo" />
          </div>

          </div>

        </div>


        <div className="col-md-5">
        <div className=' d-flex   justify-content-center  align-items-center '>
        <div><h6 className='me-4'> Get Deliveries With Freash Cart</h6></div>
        <div className=' d-flex justify-content-center align-items-center'>
        <img src={require('../../images/images Footer/app store.jpg')} className='m-1' style={{height:"40px" , width:"80px"}} alt="AppStore Logo" />
        <img src={require('../../images/images Footer/google play.jpg')} className='m-1' style={{height:"40px" , width:"80px"}}  alt="Google Play Logo" />
        </div>

        </div>

        </div>


      </div>


      <div  >
        

       

        

      </div>

    </div>

  </div>

  </div>
 
  
  </>
}

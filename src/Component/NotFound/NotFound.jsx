import React from 'react'
import error from '../../images/error.svg'

export default function NotFound() {
  return <>
  <div className="w-50 m-auto  h-25">
  <img  src={error} className='w-75' alt="Not Found Page" />
  </div>
  </>
}

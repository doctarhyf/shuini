import React from "react"

export default function FormValidationMessage({data}){
    return (
      <div className='text-xs bg-red-500 text-white p-1 rounded-md ' >
        
        {data}
      </div>
    )
  }
import React from "react"

export default function PageHeader({title, sub}){
    return (
      <div>
        <div className='text-lg' >{title}</div>
        <div className='text-sm'>{sub}</div>
      </div>
    )
  }
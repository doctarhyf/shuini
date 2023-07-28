import React from "react"

export default function ButtonMenu(props){

    //console.warn('props =>', props)
  
    return (
      <li><button className={`${props.name === props.selectedPage.name ? 'bg-blue-700'  : ''} hover:bg-blue-700 mb-2 p-2 text-sm rounded-md w-full text-left`} name={props.name} onClick={props.onClick}>{props.label}</button></li>
    )
  }
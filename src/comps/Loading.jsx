import React from "react";
import load from '../assets/load.svg'

export default function Loading(props){

    const { loading } = props

    return (
        <>
        { loading && <div className="">
            <img className="" src={load} width={60} height={60} />
          </div> }
        </>
    )
}
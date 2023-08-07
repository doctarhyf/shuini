import React from "react";
import load from '../assets/load.svg'

export default function Loading(props){

    const { loading } = props

    return (
        <>
        { loading && <div>
            <img src={load} width={30} height={30} />
          </div> }
        </>
    )
}
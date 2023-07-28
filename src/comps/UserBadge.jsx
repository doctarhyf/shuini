import React from "react";


export default function UserBadge(props){

    const { authStore } = props;

    return(
        <div className="p-2 text-sm my-2 border-b border-t border-slate-400">
            <div>{ authStore.model?.username || '' }</div>
            <div className="text-slate-300 text-xs">{ authStore.model?.phone || '' }</div>
            <div className="text-white p-1 rounded-md text-center bg-yellow-600 text-xs ">{ authStore.model?.role || '' }</div>
        </div>
    )
}
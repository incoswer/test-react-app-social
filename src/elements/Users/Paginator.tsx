import React, {useState} from 'react'
import css from "./users.module.css";

type propsType={
    totalUsersCount:number
    pageSize:number
    portionSize?:number
    onPageChanged:(pageNumber:number)=>void
    currentPage:number
}


const Paginator:React.FC<propsType>= (props)=>{
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages:Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber,setPortionNumber]=useState(1)
    let leftPortionNumber = (portionNumber - 1) * props.portionSize +1
    let rightPortionNumber = portionNumber * props.portionSize
    return<>
        {portionNumber > 1 &&
        <button onClick={()=>setPortionNumber(portionNumber-1)}>Pre</button>}
        {pages.filter((p)=> p>=leftPortionNumber && p<= rightPortionNumber)
            .map((p)=>{
                return <span className={(props.currentPage === p ? css.currentPage : null) +' '+ css.pageItem} key={p} onClick={(e)=>{
                props.onPageChanged(p)}}>{p}</span>
                })
            }
        {portionCount>portionNumber && <button onClick={()=>setPortionNumber(portionNumber+1)}>Next</button>}

        </>
}
export default Paginator

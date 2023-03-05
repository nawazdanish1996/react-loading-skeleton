import React, { useEffect, useState } from 'react';
import "../css/SkletonComp.scss"
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkletonComp = (props) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            axios.get("https://dummyjson.com/products?limit=5")
            .then((resp)=> {
                setData(resp.data.products)
                setIsLoading(false)
            })
            .catch(err => console.log(err.message));
        }, 5000)
    },[]);
  
  return (
    <div className='sklt'>
        <div className="box-1">
            {isLoading ?
                <div className='underBox'>
                    <SkeletonTheme baseColor="#bdc3c7" highlightColor="#95a5a6">
                        <Skeleton circle={false} height={220} />
                        <h1><Skeleton count={1} /></h1>
                        <p><Skeleton count={1} /></p>
                    </SkeletonTheme>
                </div>
                :
                data.map((val)=>{
                    return(
                    <div className='underBox' key={val.id}>
                        <img src={val.thumbnail} alt={val.title} />
                        <h1>{val.title.slice(0, 8)}</h1>
                        <p>{val.description.slice(0, 50)}</p>
                    </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default SkletonComp;
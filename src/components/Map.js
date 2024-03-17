import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import {faCircleInfo,faPenToSquare,faTrashCan,faMapLocationDot} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NeshanMap, {NeshanMapRef} from "@neshan-maps-platform/react-openlayers"


const Map = () => {
  const {id} = useParams()
  const [data,setData] = useState([])
 
  useEffect(()=>{
    axios.get('http://localhost:3001/users/' +id)
    .then(res =>{ 
      setData(res.data)
    })
    .catch(err => console.log(err))
  },[])
 

  return (
    <>     
        <div className='pt-[30px] mx-[10px]'>

    <NeshanMap
        mapKey="web.90e1d143a7244c7f954f31056ee80aa5"
        defaultType="neshan"
        center={{ latitude:35.69072405210615, longitude:51.39568251438543 }}
        style={{ height: "48vh", width: "100%" }}
        zoom={16}
      ></NeshanMap>
      
        <div className='mt-[35px]'><Link to={'/'} className='w-[105px] rounded w-full py-[7px] px-3 text-white' style={{backgroundColor: "#1175E3"}}>بازگشت</Link></div> 
        </div>
        
    </>
  )
}

export default Map
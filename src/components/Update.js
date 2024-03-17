import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {TERipple,TEModal,TEModalDialog,TEModalContent,TEModalHeader,TEModalBody,TEModalFooter,} from "tw-elements-react";

const Update = () => {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const {id} = useParams()
  const [data,setData] = useState([])
  const [values,setValues] = useState({
    name:'',
    lastname:'',
    nationalId:'',
    Coordinates:''
  })
  const navigate = useNavigate()

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3001/users/'+id,values)
    .then(res => 
      {
        console.log(res);
        navigate('/')
      })
    .catch(err => console.log(err))   
  }

  useEffect(()=>{
    axios.get('http://localhost:3001/users/'+id)
    .then(res => {
      setValues(res.data)
    })
    .catch(err => console.log(err))
  },[])
  return (
    <>
      <div className='pt-[30px] mx-[10px]'>
          <form className="flex rounded px-8">   
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
                نام
              </label>
              <input onChange={e=>setValues({...values,name:e.target.value})} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={values.name}/>
            </div>
            <div className='mx-6'>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="lastName">
                نام خانوادگی
              </label>
              <input onChange={e=>setValues({...values,lastname:e.target.value})} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" value={values.lastname}/>
            </div>
            <div className='ml-6'>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="nationalCode">
                کد ملی
              </label>
              <input onChange={e=>setValues({...values,nationalId:e.target.value})} className="appearance-none border rounded w-full py-2 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nationalCode" type="text" value={values.nationalId}/>
            </div>
            <div className='ml-6'>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="Coordinates">
                طول جغرافیایی
              </label>
              <input onChange={e=>setValues({...values,long:e.target.value})} className="appearance-none border rounded w-full py-2 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Coordinates" type="text" value={values.long}/>
            </div>
            <div className='ml-6'>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="Coordinates">
                عرض جغرافیایی
              </label>
              <input onChange={e=>setValues({...values,lat:' '+e.target.value})} className="appearance-none border rounded w-full py-2 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Coordinates" type="text" value={values.lat}/>
            </div>
            
            
          </form>
        <div className='flex'>
          <div className='mt-[35px]'><Link to={'/'} className='w-[105px] rounded ms-[30px] py-[7px] px-3 text-white' style={{backgroundColor: "#1175E3"}}>بازگشت</Link></div>
          <div className='mt-[28px]'><button onClick={handleUpdate} className='w-[105px] rounded ms-[10px] py-[7px] px-3 text-white' style={{backgroundColor: "#F60002"}}>بروزرسانی</button></div> 
        </div>
      </div>
      
    </>
  )
}

export default Update
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Read = () => {
  const {id} = useParams()
  const [data,setData] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/users/'+id)
    .then(res => setData(res.data))
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
              <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={data.name}/>
            </div>
            <div className='mx-6'>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="lastName">
                نام خانوادگی
              </label>
              <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" value={data.lastname}/>
            </div>
            <div className='ml-6'>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="nationalCode">
                کد ملی
              </label>
              <input className="appearance-none border rounded w-full py-2 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nationalCode" type="text" value={data.nationalId}/>
            </div>
            <div className='mt-[35px]'><Link to={'/'} className='w-[105px] rounded w-full py-[7px] px-3 text-white' style={{backgroundColor: "#1175E3"}}>بازگشت</Link></div>
          </form>
    </div>
    </>
  )
}

export default Read
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleInfo,faPenToSquare,faTrashCan,faMapLocationDot} from '@fortawesome/free-solid-svg-icons'
import {TERipple,TEModal,TEModalDialog,TEModalContent,TEModalHeader,TEModalBody,TEModalFooter,} from "tw-elements-react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { set } from '@neshan-maps-platform/ol/transform';
const Home = () => {

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [data,setData] = useState([])

  const [search,setSearch] = useState('')
  const [values,setValues] = useState({
    name:'',
    lastname:'',
    nationalId:'',
    lat:'',
    long:''
  })


  const navigate = useNavigate()
  const handleSubmitCreate = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/users',values)
    .then(res => 
      {
        console.log(res);
        window.location.reload()
      })
    .catch(err => console.log(err))   
  }
  const {id} = useParams()

  useEffect(()=>{
    axios.get('http://localhost:3001/users')
    .then(res =>{ 
      setData(res.data)
    })
    .catch(err => console.log(err))
  },[])


  const handleDelete = (id) => {
    const confirm = window.confirm("آیا میخواهید این کاربر را حذف کنید؟")
    if(confirm){
      axios.delete('http://localhost:3001/users/'+id)
    .then(res => {
        window.location.reload()
      })
      .catch(err => console.log(err))  
    }
  }

  return (
    <>
    {/*Modals*/}
      <TEModal show={showModalCreate} setShow={setShowModalCreate}>
        <TEModalDialog>
          <TEModalContent style={{backgroundColor: "#F8FAFC"}}>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 ">
                افزودن کاربر
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModalCreate(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>  
              <div className='flex flex-col'>
                <div>
                  <label className="block text-gray-700  mb-2" htmlFor="name">
                    نام
                  </label>
                  <input onChange={e=>setValues({...values,name:e.target.value})} className="appearance-none border rounded mb-2 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"/>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="lastname">
                    نام خانوادگی
                  </label>
                  <input onChange={e=>setValues({...values,lastname:e.target.value})} className="appearance-none border rounded  py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text"/>
                </div>
                <div className='ml-6'>
                  <label className="block text-gray-700  my-2" htmlFor="nationalCode">
                    کد ملی
                  </label>
                  <input onChange={e=>setValues({...values,nationalId:e.target.value})} className="appearance-none border rounded py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nationalCode" type="text"/>
                </div>
                <div className='ml-6'>
                  <label className="block text-gray-700  my-2" htmlFor="long">
                    طول جغرافیایی
                  </label>
                  <input onChange={e=>setValues({...values,long:e.target.value})} className="appearance-none border rounded py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="long" type="number"/>
                </div>
                <div className='ml-6'>
                  <label className="block text-gray-700  my-2" htmlFor="lat">
                  عرض جغرافیایی
                  </label>
                  <input onChange={e=>setValues({...values,lat:' '+e.target.value})} className="appearance-none border rounded py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lat" type="number"/>
                </div>               
              </div>
              </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="rounded mx-2 py-[7px] px-3 text-[#1175E3] border border-[#1175E3]"style={{backgroundColor: "#white"}}
                  onClick={() => setShowModalCreate(false)}>
                  انصراف
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="rounded py-[7px] px-3 text-white"style={{backgroundColor: "#1175E3"}} onClick={handleSubmitCreate}>
                  افزودن
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>

      <div className='flex flex-col pt-[20px] mx-[80px] place-items-center place-content-center'>
        <div className='flex lg:w-[840px] md:w-[700px] sm:w-[600px] xs:w-[450px]'>        
          <div className='py-[10px] rounded-lg' style={{backgroundColor: "#F8FAFC"}}>
              <p className='py-2 px-5 font-bold'>جست و جو</p>
              <p className='border-b-2 mx-[20px]' style={{backgroundColor: "#D9DBE9"}}></p>
          <div className='lg:w-[840px] md:w-[700px] sm:w-[600px] xs:w-[450px] pt-[30px] mx-[10px]'>
            <form className="rounded px-8">   
              <div>
                <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
                  جست و جو بر اساس نام , نام خانوادگی و یا کد ملی
                </label>
                <input onChange={(e)=>setSearch(e.target.value)}
                className=" appearance-none border rounded py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text"/>
              </div>
            </form>
          </div>
          </div>   
        </div>

        <TERipple rippleColor="white">
          <button
            type="button"
            className="rounded my-[15px] py-[7px] px-3 text-white"style={{backgroundColor: "#1175E3"}}
            onClick={() => setShowModalCreate(true)}>افزودن
          </button>
        </TERipple>

        <div>
        <div className="flex flex-col overflow-x-auto lg:w-[840px] md:w-[700px] sm:w-[600px] xs:w-[450px]" >
            <div>
              <div className="py-2 inline-block min-w-full ">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b ">
                      <tr className=''>
                        <th scope="col" className="text-sm font-medium text-right text-gray-900 ps-6 py-4 text-left">
                          ردیف
                        </th>
                        <th scope="col" className="text-sm font-medium text-right text-gray-900 ps-6 py-4 text-left">
                          نام
                        </th>
                        <th scope="col" className="text-sm font-medium text-right text-gray-900 ps-6 py-4 text-left">
                          نام خانوادگی
                        </th>
                        <th scope="col" className="text-sm font-medium text-right text-gray-900 ps-6 py-4 text-left">
                          کدملی
                        </th>
                        <th scope="col" className="text-sm font-medium text-right text-gray-900 ps-6 py-4 text-left">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.filter((item)=>{
                          return (
                            search === '' ? item : item.name.includes(search) ||
                            search === '' ? item : item.lastname.includes(search) ||
                            search === '' ? item : item.nationalId.includes(search) 
                          )
                        }).map((data,index)=>(

                          <tr className="border-b" style={{backgroundColor: "#F8FAFC "}} key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.id}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.name}
                        </td>
                        
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.lastname}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.nationalId}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                        <Link to={`/read/${data.id}`}>
                            <FontAwesomeIcon icon={faCircleInfo} size='lg' className='px-2' />
                        </Link>
                        <Link to={`/update/${data.id}`}>
                        <FontAwesomeIcon icon={faPenToSquare} size='lg' className='px-2' />
                        </Link>
                        <TERipple rippleColor="white">
                        <button
                          type="button">
                            <FontAwesomeIcon icon={faTrashCan} size='lg' className='px-2' onClick={e => handleDelete(data.id)}/>
                        </button>
                        </TERipple>
                        <Link to={`/map/${data.id}`}>
                        <FontAwesomeIcon icon={faMapLocationDot} size='lg' className='px-2' />
                        </Link>
                        </td> 
                      </tr>
                        ))
                      }

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Home
import React from 'react'
import {formatAPIDate} from '../utils/Dates'
import { Link } from 'react-router-dom'
import {useGET} from '../hooks/useApi'


const Courses2 = () => {

    const {isLoading,data}=useGET('category_view/')
    if (isLoading){
      return <>
      <h2 className='text-lg text-blue-600'>Loading.....</h2>
      </>
    }
  return (
    <div>
         <div className='w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll'>
    <h2 className='p-3 text-left w-full text-2xl font-semibold text-gray-600'>Courses</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full gap-4 items-center rounded min-w-md p-4'>
        {
          data?.map(
            item => (
              <>
              <Link key={item.id} to={`${item.id}`} className='px-4 py-4 bg-gray-100 shadow-md rounded flex flex-col space-y-2 w-full outline hover:cursor-pointer outline-0 hover:outline-1'>
                <span className='text-xl font-semibold tracking-wide text-blue-600'>
                  {item.name}
                </span>
                <span className='text-sm'>
                  Course created on <span className='font-[600]'>{formatAPIDate(item.date_created)}</span>
                </span>

              </Link>
              </>
            )
          )
        }
      </div>
    </div>
    </div>
  )
}

export default Courses2
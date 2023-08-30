import React from 'react'
import {formatAPIDate} from '../utils/Dates'
import { Link,useParams } from 'react-router-dom'
import { useGET } from '../hooks/useApi'

function CourseSubjects() {

  const {id}=useParams()

  const {isLoading,data,isError}=useGET(`/courses/${id}/subjects/`)


  if (isLoading){
    return <>
    <h2 className='text-lg text-blue-600'>Loading.....</h2>
    </>
  }

  return (
    <>
    <div className='w-full h-full max-h-full flex flex-col items-center p-4 gap-2 overflow-y-scroll'>
    <h2 className='p-3 text-left w-full text-lg font-semibold text-blue-600 flex gap-2'>
      <Link to='/course'>Courses</Link>/<Link to={data[0]?.id} >{data[0]?.name}</Link>
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full gap-4 items-center rounded min-w-md p-4'>
        {
          data?.map(
            item => (
              <div key={item.id} className='px-4 py-4 bg-gray-100 shadow-md rounded flex flex-col space-y-2 w-full outline hover:cursor-pointer outline-0 hover:outline-1'>
                <span className='text-xl flex gap-2 font-semibold tracking-wide text-blue-600'>
                  <span>{item.name}</span>
                  <span className='text-gray-600'>-</span>
                  <span className='pl-2 border-l-0 border-gray-800'>{item.code}</span>

                </span>
                <span className='text-sm'>
                  Course created on <span className='font-[600]'>{formatAPIDate(item.date_created)}</span>
                </span>
              </div>
            )
          )
        }
      </div>
    </div>
    </>
  )
}

export default CourseSubjects
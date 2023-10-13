import React,{ useState,useEffect } from 'react'
import {useGET} from '../hooks/useApi'
import { formatAPIDate } from '../utils/Dates'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi'
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Addcourses = () => {

    const emptyFormData={
        name: '',
        slug: '',
    }

    const [isEdit, setIsEdit] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [formData, setFormData] = useState(emptyFormData);
    const { data:courseList,refetch,setData:setCourseList} = useGET('category_view/') 
    
    const [searchTerm,setSearchTerm]=useState('');
    
    
    const onChange =(event )=>{
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    }

    const onSearch =(searchTerm) =>{
        //our api//
        axios.get(`search_categorys/?search=${searchTerm}`)
        .then(res=>{
                    setCourseList(res.data);
                })
                .catch(err =>{console.log(err)
                }); 
        
        console.log('search',searchTerm);

    }    
    const addCourse = () => {
        setIsEdit(false)
        setFormData(emptyFormData)
        setModalOpen(true)

    }

    const editCourse = (course) => {
        setIsEdit(true)
        setFormData({name:course.name,slug:course.slug,id:course.id})
        setModalOpen(true)

    }

    const deleteCourse=(course)=>{
        setIsEdit(false)
        axios.delete(`category_delete/${course.id}/`).then(
            ()=>{
                toast.success('Deleted successfully')
                refetch()

            }
        ).catch(err=>{
            toast.error('Encountered Error')
        }).finally(
            ()=>{
                setModalOpen(false)
            }
        )
    }





    const CourseForm = () => {
          const { name, slug } = formData;
          const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          };
          const handleSubmit = (e) => {
            e.preventDefault();

            //----------------------------------------------Api for performing Course Edit-------------------------------------------------//

            if(isEdit){
                axios.patch(`/category_update/${formData.id}/`,{name:name,slug:slug}).then(
                    ()=>{
                        toast.success('Updated successfully')
                        refetch()
                    }
                ).catch(err=>{
                    toast.error('Encountered Error')
                }).finally(
                    ()=>{
                        setModalOpen(false)
                        refetch()
                    }
                )
            }


            //----------------------------------------------------API for category create--------------------------------------------//
            else{
                axios.post(`/category_creates/`,{name:name,slug:slug}).then(
                    ()=>{
                        toast.success('Added successfully')
                        refetch()
                        
                    }
                ).catch(err=>{
                    toast.error('Encountered Error')
                }).finally(
                    ()=>{
                        setModalOpen(false)
                    }
                )
      
            }

            // Handle form submission logic here
          };
        return (
            <>
                <form className='py-2 px-1' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                            Slug
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={slug}
                            onChange={handleChange}
                            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            {isEdit?'Update':'Add'}
                        </button>
                    </div>
                </form>
            </>
        )
    }




    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Course List</h2>

                {/* ............................................For SearchButton............................................................ */}


                <div>
                    <input  type="text"
                    placeholder="Search..."
                    value={searchTerm}
                     onChange={onChange}
        
                    className='border p-2 rounded-2xl w-64 pl-12' />

                    <button  onClick={()=>onSearch(searchTerm)} className='bg-blue-500 text-white py-1 rounded-xl focus:outline-none px-8 m-2'>Search</button>
                </div>



                <button onClick={addCourse} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    <AiOutlinePlus className="w-5 h-5 mr-2 inline-block" />
                    Add Course
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className='text-left font-semibold bg-gray-500 text-gray-200'>
                            <th className="py-3 px-4 border-b ">
                                Name
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Slug
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Created
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Updated
                            </th>
                            <th className="py-3 px-4 border-b ">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList?.map((course) => (
                            <tr key={course.id}>
                                <td className="py-4 px-6 border-b">
                                    <Link className='text-blue-700' to={`/course/${course.id}`}>{course.name}</Link></td>
                                <td className="py-4 px-6 border-b">
                                    {course.slug}
                                    </td>
                                <td className="py-4 px-6 border-b">{formatAPIDate(course.date_created)}</td>
                                <td className="py-4 px-6 border-b">{formatAPIDate(course.date_updated)}</td>
                                <td className="py-4 px-6 border-b">
                                    <button className="text-blue-500 hover:text-blue-600 hover:scale-110  mr-2">
                                        <BiPencil onClick={() => editCourse(course)} className="w-5 h-5 " />
                                    </button>
                                    <button onClick={()=>deleteCourse(course)} className="text-red-500 hover:scale-110 hover:text-red-600">
                                        <BiTrash className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} title={isEdit ? 'Update Course' : 'Add Course'} content={CourseForm()} />
            </div>
        </div>)
}

export default Addcourses
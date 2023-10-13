
import React,{useState,useEffect} from 'react'
import Modal from "../components/Modal";
import { useGET } from '../hooks/useApi';
import { formatAPIDate } from '../utils/Dates'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi'
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { Link } from 'react-router-dom';


const Addsubject = () => {

  const emptyFormData={
    name: '',
    code: '',
    category:null
}


const [isEdit, setIsEdit] = useState(false)
const [isModalOpen, setModalOpen] = useState(false)
const [formData, setFormData] = useState(emptyFormData);
const [selectOptions,setSelectOptions]=useState([])


const { data:subjects, isLoading, isError,refetch } = useGET('subject_view/')    

    

useEffect(() => {

    axios.get('category_view/').then(resp=>{

        const data=resp?.data?.map(item=>({label:item.name,value:item.id}))
        setSelectOptions(data)
    })
   
  return () => {
  }
}, [])




const addSubject = () => {
    setIsEdit(false)
    setFormData({...emptyFormData,category:selectOptions[0].value})
    setModalOpen(true)

}

const editSubject = (course) => {
    setIsEdit(true)
    setFormData({name:course.name,code:course.code,category:course.category,id:course.id})
    setModalOpen(true)

}

const deleteSubject=(course)=>{
    setIsEdit(false)
    axios.delete(`subject_delete/${course.id}/`).then(
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
                    //............................................................................. This state is for selectOptions...............................................................//
const onCategoryChange=(e)=>{
  setFormData({...formData,category:e.target.value})
}





const SubjectForm = () => {
      const { name, code,category } = formData;
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();


//--------------------------------------------------------------API for Edit Subject--------------------------------------------------------------//

        if(isEdit){
            axios.patch(`/subject_update/${formData.id}/`,{name:name,code:code,category:category}).then(
                ()=>{
                    toast.success('Updated successfully')
                    refetch()
                }
            ).catch(err=>{
              const messages=Object.values(err.response.data).join(',').toUpperCase()
              toast.error(`${messages}`,{
                pauseOnHover:true,
                autoClose:3000
              })
            }).finally(
                ()=>{
                    setModalOpen(false)
                    refetch()
                }
            )
        }

        //-----------------------------------------------------API for Post Subject-------------------------------------------------------------------------------------//

        else{
            axios.post(`/subject_create/`,{name:name,code:code,category:category}).then(
                ()=>{
                    toast.success('Added successfully')
                    refetch()
                    
                }
            ).catch(err=>{
              const messages=Object.values(err.response.data).join(',').toUpperCase()
              toast.error(`${messages}`,{
                pauseOnHover:true,
                autoClose:3000
              })
          }).finally(
                ()=>{
                    setModalOpen(false)
                    refetch()
                }
            )
  
        }

      };
    return (
        <>
            <form className='py-2 px-1' onSubmit={handleSubmit}>
            <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category <span className="text-red-500">*</span>
                    </label>

                    {/* .........................................................FOR SELECTOPTIONS....................................................................... */}


                    <select required value={formData.category} onChange={onCategoryChange} id='category' name='category' className='w-full mt-1 p-2 cursor-pointer outline-gray-300 rounded bg-transparent outline outline-1'>
                      {
                        selectOptions?.map(item=>
                          <option className='w-full' value={item.value}>
                            {item.label}
                          </option>
                          )
                      }
                    </select>
                </div>
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
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Code <span className="text-red-500">*</span>
                    </label>
                    <input
                    required
                        type="number"
                        id="code"
                        name="code"
                        value={code}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>



{/* ............................................................FOR ADD & UPDATE BUTTON ........................................................................ */}



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

  if (isLoading) {
    return (
      <>
        <span className="text-lg">Loading....</span>
      </>
    )
  }

  return (
    <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Subjects List</h2>
            <button onClick={addSubject} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                <AiOutlinePlus className="w-5 h-5 mr-2 inline-block" />
                Add Subject
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className='text-left font-semibold bg-gray-500 text-gray-200'>
                    {/* <th className="py-3 px-4 border-b ">
                            Course
                        </th> */}
                        <th className="py-3 px-4 border-b ">
                            Name
                        </th>

                        <th className="py-3 px-4 border-b ">
                            Code
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
                    {subjects?.map((sub) => (
                        <tr key={sub.id}>
                            {/* <td className="py-4 px-6 border-b">
                            <Link className='text-blue-700' to={`/course/${sub.category}`}>{sub.category_name}</Link>
                            </td> */}
                            <td className="py-4 px-6 border-b">
                              {sub.name}
                            </td>
                            <td className="py-4 px-6 border-b">{sub.code}</td>
                            <td className="py-4 px-6 border-b">{formatAPIDate(sub.date_created)}</td>
                            <td className="py-4 px-6 border-b">{formatAPIDate(sub.date_updated)}</td>
                            <td className="py-4 px-6 border-b">
                                <button className="text-blue-500 hover:text-blue-600 mr-2 hover:scale-110">
                                    <BiPencil onClick={() => editSubject(sub)} className="w-5 h-5" />
                                </button>
                                <button onClick={()=>deleteSubject(sub)} className="text-red-500 hover:scale-110 hover:text-red-600">
                                    <BiTrash className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} title={isEdit ? 'Update Subject' : 'Add Subject'} content={SubjectForm()} />
        </div>
    </div>
    )
}
export default Addsubject





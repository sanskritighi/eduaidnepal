import axios from "../axios";



const getCourses = async (id) =>{
    return await axios.get(`category_view/${id}`)
}


const listCourses = async () =>{
    return await axios.get('category_view/')
}

const addCourse=async(data)=>{
    return await axios.post('category_create/',data)
}

const delete_course= async (id)=>{
    return await axios.delete(`category_delete/${id}/`)
}

const edit_course= async ({id,data})=>{
    return await axios.patch(`category_update/${id}/`,data)
}


export {getCourses,listCourses,addCourse,delete_course,edit_course}
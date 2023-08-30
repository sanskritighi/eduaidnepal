import axios from "../axios";

const list_subjects = async () =>{
    return await axios.get('subject_view/')
}

const add_subject=async(data)=>{
    return await axios.post('subject_create/',data)
}

const delete_subject= async (id)=>{
    return await axios.delete(`subject_delete/${id}/`)
}

const edit_subject= async ({id,data})=>{
    return await axios.patch(`subject_update/${id}/`,data)
}


export {list_subjects,add_subject,delete_subject,edit_subject}
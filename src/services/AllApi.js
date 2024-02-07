import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


// add user - here add student

export const addUser=async(body,header)=>{
    return await commonApi("POST",`${BASE_URL}/add`,body,header)
}

// GET Students
export const allStudents = async(search)=>{
    // if you are seing a '?' in a URL then you need to understand that it is a query parameter
    return await commonApi("GET",`${BASE_URL}/get-all-students?search=${search}`,"")
}

// DELETE Students

export const deleteStudent = async(id)=>{
    return await commonApi("DELETE",`${BASE_URL}/delete-student/${id}`,{})
}

// Update student
export const editStudent = async(id,body,header)=>{
    return await commonApi("PUT",`${BASE_URL}/edit/student/${id}`,body,header)
} 
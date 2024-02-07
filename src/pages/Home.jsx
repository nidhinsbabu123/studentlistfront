import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { allStudents, deleteStudent } from '../services/AllApi'
import { registerContext } from './Contextshare'
import { Alert } from 'react-bootstrap'

function Home() {

  const{registerdata, setRegisterData} = useContext(registerContext)

  const[allStudentData,setallStudentData] = useState([])

  const[search,setSearch] = useState("")

  const {id} = useParams()
  console.log(id);

  const [showspin, setshowSpin] = useState(true)

  useEffect(() => {

    getAllPupils()

    setTimeout(() => {

      setshowSpin(false)

    }, 1000);

  }, [search])

  // To GET all data from Mongo db using allStudents()

  const getAllPupils = async()=>{
    const response = await allStudents(search)

    console.log(response);

    setallStudentData(response.data)
  }

  // To delete a single data

  const removeStudent = async(id)=>{
    const response = await deleteStudent(id)

    if(response.status===200){
      getAllPupils()
    }else{
      alert('Operation Failed Successfully :) Please try after sometime')
    }

  }



  return (
    <>

      {

        registerdata&&<Alert variant='success' onClose={()=>setRegisterData("")} dismissible>
          {registerdata.fname.toUpperCase()}Registered Successfully
        </Alert>
      }

      

      {
        showspin ? <LoadingSpinner/> :

        <div className='container'>

        <div className='search-all d-flex align-items-center'>

          <div className='search d-flex align-items-center mt-5'>
            <span className='fw-bolder'> Search: </span>
            <input type="text" placeholder='Search by student name' onChange={e=>setSearch(e.target.value)} className='form-control ms-3' style={{width:'400px'}} />
          </div>

          <Link to={'/add'} className='btn btn-warning ms-auto mt-5'> <i class="fa-solid fa-user-plus"></i> Add</Link>

        </div>

        <div className='table mt-5'>

          <h2 className='fw-bolder'>List of all students</h2>

          <Hometable displayData={allStudentData} removestudent={removeStudent}/>

        </div>


        </div>
      }
    </>
  )
}

export default Home
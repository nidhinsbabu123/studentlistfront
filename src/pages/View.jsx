import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { allStudents } from '../services/AllApi';
import { BASE_URL } from '../services/baseUrl';


function View() {

  // To view the card using useParams() by using path parameter by sendin _id of mongo db
  const { id } = useParams()
  console.log(id);

  const [student, setStudent] = useState({})

  // For Spinner
  const [showspin, setshowSpin] = useState(true)

  useEffect(() => {

    getStudent()

    setTimeout(() => {

      setshowSpin(false)

    }, 1000);

  }, [])

  // to view, using params
  const getStudent = async () => {
    const { data } = await allStudents("")
    // console.log(data);

    // console.log(data.find(item=>item._id===id));

    setStudent(data.find(item => item._id === id))
  }

  console.log(student);


  return (
    <>

      {

        showspin ? <LoadingSpinner /> :

          <div className='container' style={{ height: '80vh' }}>

            {

              student?

              <Card className='shadow col-lg-6 ms-auto mt-5 p-3'>

                <div className='text-center'>
                  <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={`${BASE_URL}/uploads/${student.profile}`} alt="No Img" />
                </div>

                <div className='text-center'>

                  <h2>Name: {student.fname} {student.lname}</h2>
                  <h5>Email: {student.email}</h5>
                  <h5>Mobile : {student.mobile}</h5>
                  <h5>Gender : {student.gender}</h5>
                  <h5>Status : {student.status}</h5>
                  <h5>Location : {student.location}</h5>

                </div>



              </Card> : ""
            }

          </div>

      }

    </>
  )
}

export default View
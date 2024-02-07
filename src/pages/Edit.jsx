import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { allStudents, editStudent } from '../services/AllApi';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';


function Edit() {

  // create state to hold normal inputs
  const[normalUserInput,setnormalUserInput] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  // create state to hold status
  const[status,setStatus] = useState("")

  // create a state to hold uploaded file
  const[profile,setProfile] = useState("")

  // state which is going to show uploaded pic to the top center of the page
  const[preview,setPreview] = useState("")

  const[existingImg,setexistingImg] = useState("")

  // Define normal input function
  const getandsetNormalInputs=(e)=>{
    const{name,value}=e.target
    setnormalUserInput({...normalUserInput,[name]:value})
  }
  // console.log(normalUserInput);
  // console.log(status);
  // console.log(profile);

  // function definition of handlefile for uploaded profile picture
  const handlefile=e=>{
    console.log(e.target.files[0]);
    setProfile(e.target.files[0])
  }

  // For Spinner
  const [showspin, setshowSpin] = useState(true)

  useEffect(() => {

    if(profile){
      URL.createObjectURL(profile)
      setPreview(URL.createObjectURL(profile))
    }

    setTimeout(() => {

      setshowSpin(false)

    }, 1000);

  }, [profile])

  useEffect(() => {
    
    getStudent()
    
  }, [])
  

  // Edit a single student details
  const {id} = useParams()
  console.log(id);


  // Call to get all users from database
  const getStudent = async()=>{
    const {data} = await allStudents("")
    console.log(data);

    let existingStudent = data.find(item=>item._id===id)
    console.log(existingStudent);

    setnormalUserInput(existingStudent)

    setStatus(existingStudent.status)

    setexistingImg(existingStudent.profile)

  }



  // handleSubmit() definition while clicking the submit button
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const{fname,lname,email,mobile,gender,location} = normalUserInput

    if(!fname||!lname||!email||!mobile||!gender||!status||!profile||!location){
      alert('Please fill the attributes completely')
    }else{
      // alert('Form filled successfully')

      // Create form data --- here data is our 'body' for API Call
      const data = new FormData()
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      profile ? data.append("profile",profile) : data.append("profile",existingImg)
      data.append("location",location)

      // creating 'header' for the API Call-----here 'headers' is our header

      if(profile){
        var headers = {
          "content-type":"multipart/form-data"
        }
      }else{
        var headers = ""
      }


      

      // API Call for EDIT
      const response = await editStudent(id,data,headers)
      console.log(response);

    }

  }



  // For Status
  const options = [
    { value: 'Passed', label: 'Passed : Eligible for higher studies' },
    { value: 'Failed', label: 'Failed : Not eligible for higher studies' }

  ];



  return (
    <>

{

showspin?

<LoadingSpinner/>:

<div className='container mt-3'>

<h3 className='text-center fw-bolder'>Update Student Details</h3>

<div className='mt-3 shadow border rounded p-3'>

  <div className='text-center'>
    <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={preview?preview:`${BASE_URL}/uploads/${existingImg}`} alt="No Img" />
  </div>

  <Form className='mt-5'>

    <Row>

      {/* First Name */}
      <FloatingLabel controlId="floatingInputfname" label="fname" className='mb-3 col-lg-6'>
        <Form.Control type="text" placeholder=" fname" name='fname' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.fname}/>
      </FloatingLabel>

      {/* Last Name */}
      <FloatingLabel controlId="floatingInputlname" label="lname" className='mb-3 col-lg-6'>
        <Form.Control type="text" placeholder=" lname" name='lname' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.lname}/>
      </FloatingLabel>

      {/* Email */}
      <FloatingLabel controlId="floatingInputemail" label="email" className='mb-3 col-lg-6'>
        <Form.Control type="email" placeholder=" E-mail" name='email' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.email}/>
      </FloatingLabel>

      {/* Mobile */}
      <FloatingLabel controlId="floatingInputmobile" label="mobile" className='mb-3 col-lg-6'>
        <Form.Control type="text" placeholder=" Mobile"name='mobile' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.mobile}/>
      </FloatingLabel>

      {/* Gender */}



      <Form.Group className='mb-3 col-lg-6 mt-3'>

        <Form.Label>Select Gender</Form.Label>

        {/* Male */}
        <Form.Check type={"radio"} value={"Male"} label={"Male"} name='gender' onChange={e=>getandsetNormalInputs(e)} checked={normalUserInput.gender==="Male"?true:false}/>

        {/* Female */}
        <Form.Check type={"radio"} value={"Female"} label={"Female"} name='gender' onChange={e=>getandsetNormalInputs(e)} checked={normalUserInput.gender==="Female"?true:false}/>

      </Form.Group>

      {/* Status */}
      <Form.Group className='mb-3 col-lg-6 mt-3'>

        <Form.Label>Select student status</Form.Label>

        <Select placeholder={status} onChange={e=>setStatus(e.value)} options={options} />


      </Form.Group>

      {/* Upload file */}

      <Form.Group className='mb-3 col-lg-6 mt-3'>

        <Form.Label>Choose a profile picture</Form.Label>

        <Form.Control type="file" name='profile' onChange={e=>handlefile(e)}/>

      </Form.Group>

      {/* Location */}

      <FloatingLabel controlId="floatingInputlocation" label="location" className='mb-3 col-lg-6 mt-5'>
        <Form.Control type="text" placeholder="Location" name='location' onChange={e=>getandsetNormalInputs(e)} value={normalUserInput.location}/>
      </FloatingLabel>

      {/* Submit Button */}

      <Button type='submit' variant='info' onClick={e=>handleSubmit(e)}>Submit</Button>


    </Row>

  </Form>


</div>

</div>
}
      
    </>
  )
}

export default Edit
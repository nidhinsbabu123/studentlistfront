import React from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';

function Hometable({ displayData, removestudent }) {

    console.log(displayData);

    return (
        <>
            <Table striped bordered hover variant="dark" className='mt-3 shadow'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Full Name</th>
                        <th>Email-Id</th>
                        <th>Mobile</th>
                        <th>Status</th>
                        <th>Profile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayData.length > 0 ?

                            displayData.map((item, index) => (

                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.fname} {item.lname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td> <Button className={item.status==='Passed'?'btn btn-success' : 'btn btn-danger'}>{item.status}</Button> </td>
                                    <td> <img style={{ width: '70px', height: '70px', borderRadius: '50%' }} src={`${BASE_URL}/uploads/${item.profile}`} alt="No Img" /> </td>
                                    <td className='text-center'>


                                        <Link style={{ textDecoration: 'none' }} to={`/view/${item._id}`}><Button variant="success">View <i class="fa-regular fa-eye fs-6 text-dark ms-1"></i></Button> </Link>


                                        <Link className='ms-4' style={{ textDecoration: 'none' }} to={`/edit/${item._id}`}> <Button variant="warning">Edit <i class="fa-solid fa-pen fs-6 ms-1 text-primary"></i></Button> </Link>

                                        <Button onClick={()=>removestudent(item._id)} className='ms-4' variant="danger">Delete <span> <i class="fa-solid fa-trash fs-6 ms-1 text-warning"></i> </span></Button>


                                    </td>
                                </tr>

                            )) : <tr className='w-100 mt-5 text-danger'>Nothing To Display</tr>
                        
                        
                        
                    }

                </tbody>
            </Table>
        </>
    )
}

export default Hometable
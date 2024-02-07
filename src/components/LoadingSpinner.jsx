import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <>

        <div className='d-flex justify-content-center align-items-center m-5'>

        <Spinner className='me-3' animation="border" variant="light" />Loading...

        </div>

    </>
  )
}

export default LoadingSpinner
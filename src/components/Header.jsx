import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar className="bg-success">
        <Container>
          <Navbar.Brand className='fw-bolder'>

            <Link className='text-dark' to={'/'} style={{textDecoration:'none'}}>
              <i class="fa-solid fa-school me-2"></i>
              Tagore Public School
            </Link>
           
            

          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
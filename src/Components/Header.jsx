import React, { useContext } from 'react'
import { GiLaptop } from "react-icons/gi";
import {AuthContextResponse} from '../ContextAPI/AuthContext'
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';


function Header() {
  const navigate = useNavigate()
  const {isAuthorized, setIsAuthorized} = useContext(AuthContextResponse)
  const handleLogout = ()=> {
    sessionStorage.clear()
    navigate('/login')
    window.location.reload()
  }
  return (
    <div>
      <MDBNavbar light bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
          <GiLaptop className='fs-1 me-2 ms-4'/>
            <span className='fw-bolder'>Project Fair</span>
          </MDBNavbarBrand>
          {
            isAuthorized ? <button className='btn btn-danger me-4' onClick={handleLogout}>Logout</button> :""
          }
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header
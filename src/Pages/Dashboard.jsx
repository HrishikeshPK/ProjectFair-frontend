import React, { useContext, useEffect, useState } from 'react'
import AddProject from '../Components/AddProject'
import ViewProject from '../Components/ViewProject'
import UserProfile from '../Components/UserProfile'
import {AuthContextResponse} from '../ContextAPI/AuthContext'

function Dashboard() {

  const [username, setUsername ] = useState("")
  const {isAuthorized, setIsAuthorized} = useContext(AuthContextResponse)

  useEffect(()=> {
    if(sessionStorage.getItem("token")){
      setIsAuthorized(true)
    }
    else{
      setIsAuthorized(false)
    }
    setUsername(sessionStorage.getItem("username"))
  },[isAuthorized])

  return (
    <div className='container'>
      <div className="row p-5">
        <h1>Welcome {username}</h1>
      </div>
      <div className="row p-5">
        <div className="col-8">
          <div className="row">
            <div className="col-6">
              <h3>My Projects</h3>
            </div>
            <div className="col-6">
              <AddProject/>
            </div>
          </div>
          <div className="row">
              <ViewProject/>
          </div>
        </div>
        <div className="col-4">
              <UserProfile/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
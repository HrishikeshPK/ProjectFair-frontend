import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import { homeProjectAPI } from '../services/allAPI'
import {AuthContextResponse} from '../ContextAPI/AuthContext'


function Home() {
  // hold token from session storage
  const [token, setToken] = useState("")
  const {isAuthorized, setIsAuthorized} = useContext(AuthContextResponse)
  

  const [ homeProject, setHomeProject ] = useState([])
  const getHomeProject = async()=> {
    const response = await homeProjectAPI()
    console.log(response)
    setHomeProject(response.data) //array data
  }
  console.log(homeProject)

  useEffect(()=> {
    // setToken(sessionStorage.getItem("token"))
    if(sessionStorage.getItem("token")){
      setIsAuthorized(true)
    }
    else{
      setIsAuthorized(false)
    }
    getHomeProject()
  },[isAuthorized])
  return (
    <>
    <div className="container">
      <div className="row p-5 mb-5">
        <div className="col-6 p-5">
          <h1>Project Fair</h1>
          <p style={{textAlign:'justify'}}>Project management software makes it easy to plan projects, allocate tasks and keep teams organized so that deadlines and goals are met. With so many project management solutions on the market today–all with different pricing, plans and features, the decision on which to choose can be difficult. So we analyzed dozens of the leading providers to find the best project management software for small businesses in 2024.</p>
         {
          isAuthorized ? 
         <Link to={'/dashboard'}>
          <button className='btn'>View Dashboard</button>
          </Link>
          :
          <Link to={'/login'}>
          <button className='btn'>Get Started</button>
          </Link>
         }
        </div>
        <div className="col-6">
          <img className='m-2' src="https://png.pngtree.com/png-vector/20240805/ourmid/pngtree-freelancer-software-developer-programmer-coder-illustrator-png-image_13076689.png" alt="" />
        </div>
      </div>
      <div className="p-5 mt-5">
        <h3 className='text-center'>Explore Our Projects</h3>
        <div className="row p-5">
          {
            homeProject.length>0? homeProject.map(project=> (
              <div className="col-4">
            <ProjectCard project={project} />
          </div> 
            )): "No Projects"
          }
         
            
        </div>
        <div className="row text-center">
         {
          isAuthorized ?
          <Link to={'/projects'}>
         <button type="button" class="btn btn-primary">View Projects</button>        
         </Link> :""
         }
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
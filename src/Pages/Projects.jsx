import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { getAllUserProjectAPI } from '../services/allAPI';
import ProjectCard from '../Components/ProjectCard';


function Projects() {
  // 1 to hold token
  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  console.log(searchKey)

  const [allUserProject, setAllUserProject] = useState([])

  // 2 to define function for api fetching
  const getAllUserProjects = async ()=> {
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      console.log(reqHeader)
      // API Calling 
      const response = await getAllUserProjectAPI(searchKey,reqHeader)
      console.log(response)
      setAllUserProject(response.data)
    }
  }
  console.log(allUserProject)

  useEffect(()=> {
    setToken(sessionStorage.getItem("token"))
    getAllUserProjects()
  },[token,searchKey])
  return (
    <div>
      <div className="container p-5">
        <h1 className='text-center my-5'>All Projects</h1>
        <div className="d-flex w-70">
          <input onChange={e=> setSearchKey(e.target.value)} type="text" className='form-control' placeholder='Search by Technology  ' />
          <FaSearch className='fs-3 mt-1' style={{marginLeft: '-30px'}}/>
        </div>
        <div className="row p-5">
        {
            allUserProject.length>0? allUserProject.map(project=> (
              <div className="col-4">
            <ProjectCard project={project} />
          </div> 
            )): "No Projects"
          }
        </div>
      </div>
    </div>
  )
}

export default Projects
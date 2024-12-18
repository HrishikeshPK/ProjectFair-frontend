import React, { useContext, useEffect, useState } from 'react'

import { MdDelete } from "react-icons/md"
import { FaGithub } from 'react-icons/fa'
import { IoIosLink} from "react-icons/io"
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI'
import { AddProjectContextResponse, EditProjectContextResponse } from '../ContextAPI/ContextShare'
import EditProject from './EditProject'


function ViewProject() {

  const {addProjectContext, setAddProjectContext} = useContext(AddProjectContextResponse) 
  const {editProjectContext, setEditProjectContext} = useContext(EditProjectContextResponse)

  const [token, setToken] = useState("")

  const [projectDetails, setProjectDetails] = useState([])

  const getUserProject = async()=> {
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      console.log(reqHeader)

      try {
        const response = await getUserProjectAPI(reqHeader)
        console.log(response)
        setProjectDetails(response.data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handledelete = async (projectId)=> {
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      try {
        const deleteProject = await deleteProjectAPI(projectId,reqHeader)
        console.log(deleteProject)
        alert("Project deleted")
        window.location.reload()
      } catch (err) {
        console.log(err)
      }
  }
    
  }
  useEffect(()=> {
    setToken(sessionStorage.getItem("token"))
    getUserProject()
  },[token,addProjectContext,editProjectContext])
  return (
    <div>
      <div className='row p-4 me-5 mt-5 d-flex' >
      {
        projectDetails.length>0 ? projectDetails.map
        (project=> (
          <div className='d-flex justify-content-between border m-3 p-3'>
            <h5>{project.title}</h5>
            <div className='icons d-flex'>
              
              <EditProject project={project}/>
              <FaGithub className='fs-3 me-4'/>
              <IoIosLink className='fs-3 me-4'/>
              <MdDelete onClick={()=> handledelete(project._id)} className='fs-3 me-4'/>

            </div>
          </div>
        )
        ): "No projects "
        
      }
      </div>
      
    </div>
  )
}

export default ViewProject
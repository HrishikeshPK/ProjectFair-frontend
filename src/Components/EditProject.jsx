import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { MdEdit } from "react-icons/md"
import { editProjectAPI } from '../services/allAPI';
import { serverUrl } from '../services/serverUrl';
import { EditProjectContextResponse } from '../ContextAPI/ContextShare';


function EditProject({project}) {

    const {editProjectContext, setEditProjectContext} = useContext(EditProjectContextResponse)
    // const {addProjectContext, setAddProjectContext} = useContext(AddProjectContextResponse)
  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [projectDetails, setProjectdetails] = useState({
      id:project._id,
      title:project.title,
      language:project.language,
      github:project.github,
      projectImg:"",
      website:project.website,
      overview:project.overview,

    })
  
    const [preview, setPreview] = useState("")

    // edit api function

     const handleEdit = async ()=> {
        console.log(projectDetails)
        const { id,title, language, github, website, overview, projectImg } = projectDetails
      
          // API call
    
          const reqBody = new FormData()
          reqBody.append("id", id)
          reqBody.append("title", title)
          reqBody.append("language", language)
          reqBody.append("github", github)
          reqBody.append("website", website)
          reqBody.append("overview", overview)
          reqBody.append("projectImg", projectImg)
          // Creation of reqHeader
          const token = sessionStorage.getItem("token")
          console.log(token)
    
          if(token) {
            const reqHeader = {
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            try{
              const response = await editProjectAPI(id,reqBody,reqHeader)
              console.log(response)
              // setAddProjectContext(response.data)
              if(response.status==200){
                setEditProjectContext(response.data)
                alert("Project updated..")
                //Auto close modal after alert
                handleClose()
              }else{
                alert(response.response.data)
              }
            }catch (err) {
              console.log(err)
            }
          
         
        }
      }
    // image file to URL conversion
      useEffect(()=>{
        if(projectDetails.projectImg){
          setPreview(URL.createObjectURL(projectDetails.projectImg))
        }
      },[projectDetails.projectImg])
  return (
    <div>
      <MdEdit className='fs-3 me-4'onClick={handleShow}/>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg' 
      >
        <Modal.Header closeButton>
          <Modal.Title>Project title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
             <label>
              <input type="file" name='imagefile' onChange={e=> setProjectdetails({...projectDetails,projectImg:e.target.files[0]})} style={{display:'none '}}/>
              <img src={preview ? preview : `${serverUrl}/uploads/${project.projectImg}`}  width={'100%'} height={'350px'} alt="" />
             </label>
            </div>
            <div className="col-6 ">
              
              <FloatingLabel controlId="floatingPassword" label="Title" className='mb-3'>
              <Form.Control value={projectDetails.title} onChange={e=>setProjectdetails({...projectDetails,title:e.target.value})} type="text" placeholder="Title" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Language" className='mb-3'>
              <Form.Control value={projectDetails.language} onChange={e=>setProjectdetails({...projectDetails,language:e.target.value})} type="text" placeholder="Language" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="GitHub" className='mb-3'>
              <Form.Control value={projectDetails.github} onChange={e=>setProjectdetails({...projectDetails,github:e.target.value})} type="text" placeholder="GitHub" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Website" className='mb-3'>
              <Form.Control value={projectDetails.website} onChange={e=>setProjectdetails({...projectDetails,website:e.target.value})} type="text" placeholder="Website" />
              </FloatingLabel>
              
              

              <FloatingLabel
        controlId="floatingTextarea"
        label="Overview"
        className="mb-3"
      >
        <Form.Control value={projectDetails.overview} onChange={e=>setProjectdetails({...projectDetails,overview:e.target.value})} as="textarea" placeholder="Overview" style={{height:"100px"}} />
      </FloatingLabel>
              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleEdit} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditProject
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addProjectAPI } from '../services/allAPI';
import { useContext } from 'react';
import { AddProjectContextResponse } from '../ContextAPI/ContextShare';


function AddProject() {

  const {addProjectContext, setAddProjectContext} = useContext(AddProjectContextResponse)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails, setProjectdetails] = useState({
    title:"",
    language:"",
    github:"",
    projectImg:"",
    website:"",
    overview:""
  })

  const [preview, setPreview] = useState("")

  // Add function
  const handleAddProject = async ()=> {
    console.log(projectDetails)
    const { title, language, github, website, overview, projectImg } = projectDetails
    if(!title || !language || !github || !website || !overview || !projectImg){
      alert("Please fill the form")
    }
    else {
      // API call

      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImg", projectImg)

      const token = sessionStorage.getItem("token")
      console.log(token)

      if(token) {
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        try{
          const response = await addProjectAPI(reqBody,reqHeader)
          console.log(response)
          setAddProjectContext(response.data)
          if(response.status==200){
            alert("Added project Successfully")
            //Auto close modal after alert
            handleClose()
            //Clear the fields afte successfull upload
            setProjectdetails({
              title:"",
              language:"",
              github:"",
              website:"",
              overview:"",
              projectImg:""
            })
            //clear the preview of image aleso
            setPreview("")
          }else{
            alert(response.response.data)
          }
        }catch (err) {
          console.log(err)
        }
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
       <Button variant="dark" onClick={handleShow}>
        Add
      </Button>

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
              <img src={preview ? preview : "https://cdni.iconscout.com/illustration/premium/thumb/project-illustration-download-in-svg-png-gif-file-formats--analytics-logo-development-pencil-ruler-business-concept-pack-illustrations-3576471.png?f=webp"}  width={'100%'} height={'350px'} alt="" />
             </label>
            </div>
            <div className="col-6 ">
              
              <FloatingLabel controlId="floatingPassword" label="Title" className='mb-3'>
              <Form.Control onChange={e=>setProjectdetails({...projectDetails,title:e.target.value})} type="text" placeholder="Title" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Language" className='mb-3'>
              <Form.Control onChange={e=>setProjectdetails({...projectDetails,language:e.target.value})} type="text" placeholder="Language" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="GitHub" className='mb-3'>
              <Form.Control onChange={e=>setProjectdetails({...projectDetails,github:e.target.value})} type="text" placeholder="GitHub" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Website" className='mb-3'>
              <Form.Control onChange={e=>setProjectdetails({...projectDetails,website:e.target.value})} type="text" placeholder="Website" />
              </FloatingLabel>
              
              

              <FloatingLabel
        controlId="floatingTextarea"
        label="Overview"
        className="mb-3"
      >
        <Form.Control onChange={e=>setProjectdetails({...projectDetails,overview:e.target.value})} as="textarea" placeholder="Overview" style={{height:"100px"}} />
      </FloatingLabel>
              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProject
import React, { useState } from 'react';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { serverUrl } from '../services/serverUrl';

function ProjectCard({project}) {
    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => setCentredModal(!centredModal);
    return (
        <div>
            <MDBCard onClick={toggleOpen}>
                <MDBCardImage src={project?`${serverUrl}/uploads/${project.projectImg}` :"'https://th.bing.com/th/id/R.cc4fda19189f012c7d98236a32002844?rik=NrhA6D6l8MVPdA&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f7%2fWeb-Design-Transparent-PNG.png&ehk=LY4MlesZhvW2b74p1UTvjOcoq1c1CCeD%2fSghci60Kyg%3d&risl=&pid=ImgRaw&r=0' position='top' alt='projectImg' "} style={{width:"100%", height:"250px"}}/>
                <MDBCardBody>
                    <MDBCardTitle className='text-center'>{project.title}</MDBCardTitle>

                </MDBCardBody>
            </MDBCard>
            <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
                <MDBModalDialog centered size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Project title</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="row">
                                <div className="col-6">
                                    <MDBCardImage src='https://th.bing.com/th/id/R.cc4fda19189f012c7d98236a32002844?rik=NrhA6D6l8MVPdA&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f7%2fWeb-Design-Transparent-PNG.png&ehk=LY4MlesZhvW2b74p1UTvjOcoq1c1CCeD%2fSghci60Kyg%3d&risl=&pid=ImgRaw&r=0' position='top' alt='...' />

                                </div>
                                <div className="col-6">
                                    <h3>Description</h3>
                                    <p>
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                                        egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    </p>
                                    <h3>Technologies</h3>
                                    <p>React , Node</p>
                                    <h3>View on</h3>
                                    <MDBBtn color='secondary' className='me-5'>
                                        <FaGithub className='fs-1' />
                                    </MDBBtn>
                                    <MDBBtn>
                                        <FaLink className='fs-1' />
                                    </MDBBtn>
                                </div>
                            </div>

                        </MDBModalBody>
                        <MDBModalFooter>

                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>
    )
}

export default ProjectCard
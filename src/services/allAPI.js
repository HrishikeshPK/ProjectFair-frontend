import { commonAPI } from "../services/commonAPI";
import { serverUrl } from "../services/serverUrl";

export const registerAPI = async(reqBody)=>{
    return await commonAPI('post', `${serverUrl}/api/register`,reqBody, "")
}

export const loginAPI = async(reqBody)=>{
    return await commonAPI('post', `${serverUrl}/api/login`,reqBody, "")
}

export const addProjectAPI = async(reqBody,reqHeader)=>{                    // reqheader for login token
    return await commonAPI('post', `${serverUrl}/api/addProject`,reqBody, reqHeader)
}

export const homeProjectAPI = async()=>{                  
    return await commonAPI('get', `${serverUrl}/api/getHomeProject`,"","")
}

export const getAllUserProjectAPI = async(searchKey,reqHeader)=>{                  
    return await commonAPI('get', `${serverUrl}/api/getAllUserProject?search=${searchKey}`,"",reqHeader)
}

export const getUserProjectAPI = async(reqHeader)=>{                  
    return await commonAPI('get', `${serverUrl}/api/getUserProject`,"",reqHeader)
}

export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{                    // reqheader for login token
    return await commonAPI('put', `${serverUrl}/api/editProject/${projectId}`,reqBody, reqHeader)
}

export const deleteProjectAPI = async(projectId,reqHeader)=>{                    // reqheader for login token
    return await commonAPI('delete', `${serverUrl}/api/deleteProject/${projectId}`,"", reqHeader)
}


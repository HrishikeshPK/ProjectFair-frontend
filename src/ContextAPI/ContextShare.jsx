import React, {  createContext, useState } from 'react'

// 1 create context
export const AddProjectContextResponse = createContext()
export const EditProjectContextResponse = createContext()

function ContextShare({children}) {
    // 2 create a state
    const [addProjectContext, setAddProjectContext] = useState("")
    const [editProjectContext, setEditProjectContext] = useState("")

  return (
    <div>
        <AddProjectContextResponse.Provider value={{addProjectContext, setAddProjectContext}}>
          <EditProjectContextResponse.Provider value={{editProjectContext, setEditProjectContext}}>
            {children}
            </EditProjectContextResponse.Provider>  
        </AddProjectContextResponse.Provider>
    </div>
  )
}

export default ContextShare
import React, { createContext, useEffect, useState } from 'react'
// create context
export const AuthContextResponse = createContext()

function AuthContext({children}) {

    // create state
    const [isAuthorized, setIsAuthorized] = useState(false)
    useEffect(()=> {
      if(sessionStorage.getItem("token")){
        setIsAuthorized(true)
      }
      else{
        setIsAuthorized(false)
      }
    },[isAuthorized])
    return (
    <div>
        <AuthContextResponse.Provider value={{isAuthorized, setIsAuthorized}}>
            {children}
        </AuthContextResponse.Provider>
    </div>
  )
}

export default AuthContext
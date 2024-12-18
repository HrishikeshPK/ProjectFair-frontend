import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Auth({register}) {
  
  const navigate = useNavigate()

  // to hold username, email, password
  const [userDetails, setUserDetails] = useState({
    username:"",
    email:"",
    password:""
  })

  const handleRegister = async ()=> {
    console.log(userDetails)
    const { username, email, password } = userDetails
    if(!username || !email || !password){
      alert("Please fill the form")
    }
    else{
      try {
        // API fetching
        const response = await registerAPI(userDetails)
        console.log(response)
        if (response.status==200){
          
          toast.success(response.data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          
          setTimeout(()=> {
            navigate("/login")
          }, 6000)  
        }
        else {
          toast.error(response.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      } catch (err) {
        
      }
    }
  }

  const handleLogin = async ()=> {
    const { email, password } = userDetails
    if(!email || !password){
      alert("Please fill the form")
    } else {
      try {
      // API fetching
      const response = await loginAPI(userDetails)
        console.log(response)
        if (response.status==200){
          
          toast.success("Login successfull", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

            setTimeout(()=> {
              navigate("/")
            }, 6000)
            
            sessionStorage.setItem("username", response.data.currentUser.username)
            sessionStorage.setItem("token",response.data.token)
        }
        else {
          toast.error(response.response.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      }
      catch(err){
        
      }
    }
  }
  return (
    <div className="container">
      <div className="row m-3">
        <div className="col-6 p-5">
          <img src="https://srf.sitepermitx.com/assets/img/illustrations/auth-login-illustration-light.png" alt="" />
        </div>
        <div className="col-6 p-5">
          <h1>Project Fair</h1>
          <h6>Sign {
            register ? "Up" : "In"
            }</h6>
            {
              register && <input onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder='Username' className='form-control mb-3' />
            }
          <input type="email" onChange={e=>setUserDetails({...userDetails,email:e.target.value})} placeholder='Email' className='form-control mb-3' />
          <input type="password" onChange= {e=>setUserDetails({...userDetails,password:e.target.value})} placeholder='Password' className='form-control mb-3' />
          
          {
            register ? <div>
            <button onClick={handleRegister} type="button" class="btn btn-primary">Sign Up</button>
            <p className='my-2'>Already Registered ? <Link to={'/login'}>Login Now</Link></p>
          </div> 
          :
          <div>
            <button onClick={handleLogin} type="button" class="btn btn-primary">Sign In</button>
            <p className='my-2'>New to here ? <Link to={'/register'}>Register Now</Link></p>
          </div>
          }
        </div>
      </div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

<ToastContainer />
    </div>
  )
}

export default Auth
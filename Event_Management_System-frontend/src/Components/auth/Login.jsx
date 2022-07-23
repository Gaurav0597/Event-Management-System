import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login1, loginAdminId, loginAdminName, loginUser } from '../../Redux/Action'

const Login = () => {
  const userId = useSelector((state) => state.Event.userId)
  const adminId = useSelector((state) => state.Event.adminId)
  const adminName = useSelector((state) => state.Event.adminName)
  console.log(adminId,adminName)
  console.log(userId)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const login = () => {
    axios
      .post('http://localhost:5000/login', user)
      .then((res) => {
        // console.log(res.data)
        if(res.data.user.email=="gauravpetkar28@gmail.com"){
          // console.log("hello i am gaurav")
          dispatch(loginAdminId(res.data.user._id))
          dispatch(loginAdminName(res.data.user.name))
        }else{
          // console.log("i am user")
          dispatch(login1(res.data.user._id))
          dispatch(loginUser(res.data.user.name))
        }
        // navigate('/')
        if (userId ||adminId  !== '') {
          alert(res.data.message)
          navigate('/')
        }
      })
      .catch(function (err) {
        alert('invalid credentials')
      })
  }

  return (
    <div className="login">
      <h1 className="font-medium text-4xl mb-6 ">Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your Password"
      ></input>{' '}
      <div
        className="pl-8 pr-8 bg-blue-500 h-10 rounded-md text-white pt-2 font-medium"
        onClick={() => {
          login()
        }}
      >
        Login
      </div>
      <div>or</div>
      <Link to="/register">
        <div className="pl-8 pr-8 bg-blue-500 h-10 rounded-md text-white pt-2 font-medium">
          Register
        </div>
      </Link>
    </div>
  )
}

export default Login

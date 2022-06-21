import React, { useState } from 'react'
import "./LoginForm.css"
import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/axios'

function LoginForm() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const onChangeFields = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();

    const {username, password} =  user
    if(username !== '' && password !== ''){
      
      const response = sendUser(user)
      console.log(response);

      if(response.success){
        navigate("/usersuccess", { state:{dataUser: response.dataUser}});
      }else {

        setErrorText('Access denied')
        setError(true);

        setTimeout(() => {
          setError(false)
          setErrorText('')
          
        }, 3000);
      }

    } else {
      setErrorText('All fields are required')
      setError(true);

      setTimeout(() => {
        setError(false)
        setErrorText('')
      }, 3000);
    }
    
  };

  const sendUser = async (currentUser) => {
    try {
      const response = await clienteAxios.post('/api/login', currentUser)
      return response.data  
    } catch (error) {
      setErrorText('API connection error')
      setError(true);

      setTimeout(() => {
        setError(false)
        setErrorText('')
      }, 3000);
    }
    
  }
  
  return (
    <>
    <h1>Login Form</h1>  
      <div className='container'>
      {
          error ? 
          <div className='error'>
          {errorText}
          </div>
          : 
          ''
        }
      <label>Username : </label>   
      <input type="text" placeholder="Enter Username" name="username" required onChange={onChangeFields}></input>

      <label>Password : </label>  
      <input type="password" placeholder="Enter your password" name="password" required onChange={onChangeFields}></input>

      <button type="submit" onClick={onSubmitLogin}>Login</button>  
      </div>
     <Link to='/register' className='mt'>Register new user</Link>
    </>
  )
}

export default LoginForm
import React, {useState} from 'react'
import clienteAxios from '../../config/axios'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
  let navigate = useNavigate();
  
  const [user, setUser] = useState({
    username: '',
    firtname: '',
    lastname: '',
    email: '',
    phone: '',
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

  const onSubmitUser = (e) => {
    e.preventDefault();

    const {username, firtname, lastname, email, phone, password} =  user
    if(username !== '' && firtname !== '' && lastname !== '' && email !== '' && phone !== '' && password !== ''){
      
      const response = sendUser(user)
      console.log(response);

      if(response.success){
        navigate("/usersuccess", { state:{dataUser: response.dataUser}});
      }else {
        setErrorText('API connection error')
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
      const response = await clienteAxios.post('/api/newuser', currentUser)
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
    <h1>Register New User</h1>  
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

      <label>Firt Name : </label>   
      <input type="text" placeholder="Enter Firt Name" name="firtname" required onChange={onChangeFields}></input>

      <label>Last Name : </label>   
      <input type="text" placeholder="Enter Last Name" name="lastname" required onChange={onChangeFields}></input>

      <label>Email : </label>   
      <input type="email" placeholder="Enter Email" name="email" required onChange={onChangeFields}></input>

      <label>Phone Number : </label>   
      <input type="text" placeholder="Enter Phone Number" name="phone" onChange={onChangeFields}></input>

      <label>Password : </label>  
      <input type="password" placeholder="Enter your password" name="password" required onChange={onChangeFields}></input>

      <button type="submit" onClick={onSubmitUser}>Register User</button>  
      </div>
     <Link to='/' className='mt'>Home</Link>
    </>
  )
}

export default Register
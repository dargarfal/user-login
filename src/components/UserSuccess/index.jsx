import React, {useState} from 'react'
import {useLocation, Link} from 'react-router-dom'

function UserSuccess() {
  const location = useLocation();
  const [dataUser, setDataUser] = useState(location.state?.dataUser);

  return (
    <>
    <h1>User Info</h1>  
      <div className='container'>
        <h3>{dataUser?.firtname}</h3>
        <h3>{dataUser?.token}</h3>
      </div>
     <Link to='/register' className='mt'>Register New User </Link> | 
     <Link to='/' className='mt'>  Home</Link>
    </>
  )
}

export default UserSuccess
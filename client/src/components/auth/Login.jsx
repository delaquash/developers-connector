import React, {Fragment, useState } from 'react';
import { Link } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Success");
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Sign Into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>

        <div className='form-group'>
          <input
            type='email'
            placeholder='Enter email address here'
            value={email}
            name='email'
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Enter password here'
            value={password}
            name='password'
            minLength='6'
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='login' />
      </form>
      <p className='my-1'>
        Don't have an account?
        <Link to='register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};



export default Login;

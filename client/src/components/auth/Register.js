import React, { Fragment, useState } from 'react';
import { application } from 'express';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Password do not match');
    } else {
      const newUser = {
        name,
        email,
        password,
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newUser);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Enter Email Address Here'
            value={email}
            name='email'
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile imagw, use a
            Gravatar email.
          </small>
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
        <div className='form-group'>
          <input
            type='password2'
            value={password2}
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an Account?
        <a href='login.html'>Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;

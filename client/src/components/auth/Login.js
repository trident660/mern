import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

 function Login({ login, isAuthenticated }) {

    const [formData, updateFormData] = useState({
        email: '',
        password: ''
    });

    // simplify
    const { email, password } = formData;

    // spread operator takes a copy of the formdata
    const onChange = e => updateFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // console.log('awesome!');
        login({ email, password });
    }

    // redirect if logged in
    if (isAuthenticated) {
        return <Navigate to='/welcome' />;
    }


    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Login</h2>
            <p>Login to your account</p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <input type="text" name="email" placeholder='Email' onChange={e => onChange(e)} required />
                <input type="password" name="password" placeholder='Password' onChange={e => onChange(e)} required />
                <input type="submit" value="Login" className='btn btn-primary' />
                <p>
                    Not registered yet? <Link to='/register'>Register</Link>
                </p>
            </form>
        </main>
    );


 





}

   // make sure register is passed in
   Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);

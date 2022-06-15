import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { PropTypes } from 'prop-types';

function Register({register}) {


    const [formData, updateFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpw: ''
    });

    // destructuring to simplify
    const { name, email, password, confirmpw } = formData;

    // handler to configure change handler for all fields
    const onChange = e => updateFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();

        if (password !== confirmpw) {
            console.log("Passwords must match");
        } else {
            // console.log(formData);
            register({name, email, password});
        }
    }




    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Register</h2>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <input type="text" placeholder='Name' name="name" value={name} onChange={e => onChange(e)} required />

                <input type="text" placeholder='Email' name="email" value={email} onChange={e => onChange(e)} required />


                <input type="password" placeholder='Password' name="password" value={password} onChange={e => onChange(e)} required />
                <input type="password" placeholder='Confirm Password' name="confirmpw" value={confirmpw} onChange={e => onChange(e)} required />


                <input type="submit" value="Register" className='btn btn-primary'/>
                <p>
                    Already have an account? <Link to='/login'>Log In</Link>
                </p>

            </form>
        </main>
    );
};

// make sure register is passed in
Register.propTypes = {
    register: PropTypes.func.isRequired,
};

// our initial state is null. The second param is the action used
export default connect(null, { register })(Register);

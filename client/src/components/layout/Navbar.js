import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    // variables for guest and auth links
    const authLinks = (
        <ul>
            <li><a onClick={logout} href='#!'>Logout</a></li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </ul>
    )

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <i className='fas fa-book-reader'></i> <Link to='/' className='btn btn-primary'>MERN</Link>
            </h1>
            { !loading && (<div>{isAuthenticated ? authLinks : guestLinks}</div>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
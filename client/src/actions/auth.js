import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import { REG_FAIL, REG_PASS, AUTH_FAIL,AUTH_PASS,LOGIN_FAIL,LOGIN_PASS,LOGOUT } from './types';


// load a user
export const loadUser = () => async dispatch => {
    if ( localStorage.token ) {
        // add the token to axios headers
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        // dispatch the event
        dispatch({
            type: AUTH_PASS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_FAIL
        })
    }
};


// login a user
export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_PASS,
            payload: res.data
        });
        dispatch(loadUser);
    } catch (err) {
        const errors = err.response.data.errors;
        if ( errors) {
            errors.forEach(error => alert(error.msg));
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// logout user
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

// register a user
export const register = ({ name, email, password }) => async dispatch => {

    const config = {
        headers: { 'Content-Type': 'application/json' }
    }

    const body = JSON.stringify({ email, name, password });

    try {

        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REG_PASS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => alert(error.msg));
        }
        dispatch({
            type: REG_FAIL
        });
    }
}


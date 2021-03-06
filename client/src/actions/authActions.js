import axios from 'axios'
import { returnErrors } from './errorActions'
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ITEMS
} from './types'

//  check token and load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}


// Register User
export const register = ({ name, email, password, passwordConfirmation }) => dispatch => {
    // headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({ name, email, password, passwordConfirmation })
    dispatch({ type: USER_LOADING })
    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login user
export const login = ({ email, password }) => dispatch => {
    // headers
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    // request body
    const body = JSON.stringify({ email, password })
    dispatch({ type: USER_LOADING })
    axios.post('/api/auth', body, config)
        .then(res => 
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}




// Logout user
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_ITEMS })
    dispatch({
        type: LOGOUT_SUCCESS
    })
}


export const tokenConfig = getState => { 
        // get token from local storage
        const token = getState().auth.token


        // headers
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
    
        // if token then add to headers
        if(token) {
            config.headers['x-auth-token'] = token
        }

        return config
}
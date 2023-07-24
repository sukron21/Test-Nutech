import axios from 'axios';

export const login = (body, handleSuccess) => ({
    type: "LOGIN",
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, body)
        .then((res) => {
            // console.log(res)
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const register = (body, handleSuccess) => ({
    type: "REGISTER",
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, body)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

import axios from 'axios';
import { success,error } from "../../component/handle/handle";

export const insert = (body, handleSuccess) => ({
    type: "INSERT",
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/insert`, body)
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

export const deleted = (idDelete,handleSuccess) => ({
    type: "DELETE_PRODUCT",
    payload: new Promise((resolve, reject) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/product/delete/${idDelete}`)
        .then((res) => {
            success(res);
            resolve(res);
        })
        .catch((err) => {
            // console.log(err)
            error()
            reject(err);
        });
    }),
})
export const updateProduct = (form,id,handleSuccess) => ({
    type: "UPDATE_PRODUCT",
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/product/update/${id}`, form)
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
export const updateImageProduct = (form,id,handleSuccessImage) => ({
    type: "UPDATE_IMAGE_PRODUCT",
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/product/update/photo/${id}`, form)
        .then((res) => {
            // console.log(res)
            handleSuccessImage(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})
export const getDataProduct = (pages,handleSuccessData) => ({
    type: "GET_DATA",
    payload: new Promise((resolve, reject) => {
        axios.get(`${
                  process.env.REACT_APP_BACKEND_URL
                }/productlist/limit?sort=product_name&asc=asc&limit=3${
                  pages ? `&page=${pages}` : ""
                }`)
        .then((res) => {
            // console.log(res)
            handleSuccessData(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})
export const getDataProductbyID = (id,handleSuccessDataID) => ({
    type: "GET_DATA_BY_ID",
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/productlist/${id}`)
        .then((res) => {
            // console.log(res)
            handleSuccessDataID(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const getDataProductSearch = (searching,handleSuccess) => ({
    type: "GET_DATA_SEARCH",
    payload: new Promise((resolve, reject) => {
        // console.log(searching)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/productlist/limit/${searching}`)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})
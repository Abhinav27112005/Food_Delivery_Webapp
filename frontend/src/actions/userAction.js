import axios from "axios";
import { CLEAR_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, NEW_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "../constants/userConstant";
import { CLEAR_CART } from "../constants/cartConstant";
//Login
export const login=(email,password)=> async(dispatch)=>{
    try {
        dispatch({
            type: LOGIN_REQUEST
        });
        const config={
            headers:{
                "Content-Type":"application/json",
            },
        };
        const {data}=await axios.post(`/api/v1/users/login`,{email,password},config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.data.user,
        });
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:"LOGIN FAILED",
        });
    }
};
//Register
export const register=(userData)=> async(dispatch)=>{
    try {
        dispatch({
            type:REGISTER_USER_REQUEST,
        });
        const config={
            headers:{
                "Content-Type": "multipart/form-data",
            }
        };
        const {data}=await axios.post(`/api/v1/users/signup`,userData,config);
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:data.data.user,
        });
        return data.data.user;//userful if the calling function needs this data
    } catch (error) {
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:error.respose.data.message,
        });
    }
};
//Load user action

export const loadUser=()=> async(disptach)=>{
    try{
        disptach({
            type:LOAD_USER_REQUEST
        });
        const {data}=await axios.get(`/api/v1/users/me`);
        disptach({
            type:LOAD_USER_SUCCESS,
            payload:data.user,
        });

    }catch(error){
        disptach({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message,
        });
    }
};

//update user
export const updateProfile=(userData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const config={
            headers:{
                "Content-Type":"multipart/form-data",
            },
        };
        const {data}=await axios.put("/api/v1/users/me/update",userData,config);
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.success});

    } catch (error) {
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message,
        });
    }
}

//Logout action
export const logout=()=>async(dispatch)=>{
    try {
        await axios.get(`/api/v1/users/logout`);
        dispatch({
            type:LOGOUT_SUCCESS,
        });
        dispatch({type:CLEAR_CART});//Clear cart when logut 
    } catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message,
        });
    }
};
//Clear Errors
export const clearErrors=()=>async(disptach)=>{
    disptach({
        type:CLEAR_ERRORS,
    });
};


export const updatePassword=(password)=> async(dispatch)=>{
    try {
        dispatch({
            type:UPDATE_PASSWORD_REQUEST,
        });
        const config={
            header:{
                "Content-Type":"application/json",
            },
        };
        const {data}=await axios.put("/api/v1/users/password/update",password,config);
        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        });
    } catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.message,
        });
    }
};
export const forgotPassword=(email)=>async(dispatch)=>{
    try {
        dispatch({
            type:FORGOT_PASSWORD_REQUEST
        });
        const config={
            headers:{
                "Content-Type": "application/json",
            },
        };
        const {data}=await axios.post("/api/v1/users/forgetPassword",email,config);
        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.success,
        });

    } catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response.data.message,
        });
    }
};

export const resetPassword=(token,passwords)=>async(dispatch)=>{
    try {
        dispatch({
            type:NEW_PASSWORD_REQUEST
        });
        const config={
            headers:{
                "Content-Type":"application/json",
            },
        };
        const {data}=await axios.patch(`/api/v1/users/resetPassword/${token}`,passwords,config);
        dispatch({
            type:NEW_PASSWORD_SUCCESS,
            payload:data.success,
        })
    } catch (error) {
        dispatch({
            type:NEW_PASSWORD_FAIL,
            payload:error.response.data.message,
        });
    }
}
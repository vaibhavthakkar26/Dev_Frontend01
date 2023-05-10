import { data } from "jquery";
import { get, post } from "../web.request";

const ENDPOINTURL = "http://localhost:8080"

export const userRegister = (data) => {
    return post(`${ENDPOINTURL}/api/v1/user/register`,data);
};

export const loginUser = (data) =>{
    return post(`${ENDPOINTURL}/api/v1/auth/login`,data);
} 

export const getuserData = (name) =>{
    const finalurL =  name ? `${ENDPOINTURL}/api/v1/user/list?search=${name}` : `${ENDPOINTURL}/api/v1/user/list`
    return get(finalurL)
}

export const profileDataByID = () =>{
    return get(`${ENDPOINTURL}/api/v1/user`);
}
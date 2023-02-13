import axios from "axios";

const AxiosDefault = axios.create({
    withCredentials:true
})

AxiosDefault.defaults.withCredentials = true;

export default AxiosDefault;
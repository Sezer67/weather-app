import { locationUrl } from "../../configs/url/api-url.config";
import axiosInstance from "./axios.service"
import {AxiosResponse} from 'axios'

export const getByLocation = async(url:string):Promise<AxiosResponse> =>{
    console.log(url);
    return await axiosInstance.get(url);
}

export const getByLocationForecast = async(url:string):Promise<AxiosResponse> =>{
    return await axiosInstance.get(url);
}
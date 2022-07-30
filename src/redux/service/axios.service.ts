import axios ,{AxiosResponse} from "axios";
import { baseUrl } from "../../configs/url/api-url.config";

const axiosInstance = axios.create({
  baseURL:baseUrl,
  headers:{"Access-Control-Allow-Origin": "*"}
});

//use(fulfilled,reject)
axiosInstance.interceptors.response.use(
  (response:AxiosResponse) => response,
  async function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

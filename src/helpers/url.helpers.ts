import { QueryObject } from "../types/query.type";

export const addQueryToUrl = (queries:QueryObject,url:string) =>{

    (Object.keys(queries)).forEach((queryKey:string,i)=>{
        url+= `&${queryKey}=${queries[queryKey]}`
    });
    console.log(url);
    return url;
}
import axios from "axios"

export const get = async (url: string) => {
    const { data } = await axios.get(url);
    if(data){
        return data;
    }else{
        throw new Error('Something went wrong! Data Fetch failed!')
    }
};

// export const get = async (url:string) => {
//     const res = await fetch(url);

//     if(!res.ok){
//         throw new Error('Something went wrong! Data Fetch failed!');
//     }
    
//     const data = await res.json() as unknown;
//     return data;
// }

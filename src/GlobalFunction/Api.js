import axios from "axios"

export const getTour = async ()=>{
    const res = await axios.get('https://lav2.cf/api/tour');
    return res.data.data;
}
import axios from "axios"

export const getTour = async ()=>{
    const res = await axios.get('http://lav2.cf/api/tour');
    return res.data.data;
}
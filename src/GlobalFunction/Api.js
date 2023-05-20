import axios from "axios"

export const getTour = async ()=>{
    const res = await axios.get('http://127.0.0.1:8000/api/tour');
    return res.data.data;
}

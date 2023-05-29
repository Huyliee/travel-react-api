import axios from "axios"

// Api load ra tất cả tour trong danh sách tour
export const getTour = async ()=>{
    const res = await axios.get('https://phpd19.ga/api/tour');
    return res.data.data;
}
// Api đăng nhập
export const loginApi = async (email, password)=>{
    const res = await axios.post('https://phpd19.ga/api/login',{
        email,
        password,
    })
    return res.data;
}
// Api đăng ký
export const registerApi = async (customer_name,email,password)=>{
    const res = await axios.post('https://phpd19.ga/api/signup',{
        customer_name,
        email,
        password,
    })
    return res.data;
}
//Api phân trang 
export const paginationApi = async (currentPage)=>{
    const res = await axios.get('https://phpd19.ga/api/pagnination/tour?page=' + currentPage);
    return res.data.data;
}
// Api tìm kiếm
export const searchApi = async (nameTour)=>{
    const res = await axios.get(`https://phpd19.ga/api/search?name=${nameTour}`)
    return res.data;
}
//Api tỉnh thành 
export const locationApi = async (mien)=>{
    const res = await axios.get(`https://phpd19.ga/api/location/${mien}`)
    return res.data.data;
}
//Api chi tiết tour
export const detailTourApi = async (id) =>{
    const res = await axios.get(`http://127.0.0.1:8000/api/detail/${id}`)
    return res.data.data;
}
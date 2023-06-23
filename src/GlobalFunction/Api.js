import axios from "axios"

// Api load ra tất cả tour trong danh sách tour
export const getTour = async ()=>{
    const res = await axios.get('http://127.0.0.1:8000/api/tour');
    return res.data.data;
}
// Api đăng nhập
export const loginApi = async (email, password)=>{
    const res = await axios.post('http://127.0.0.1:8000/api/login',{
        email,
        password,
    })
    return res.data;
}
// Api đăng ký
export const registerApi = async (customer_name,email,password)=>{
    const res = await axios.post('http://127.0.0.1:8000/api/signup',{
        customer_name,
        email,
        password,
    })
    return res.data;
}
//Api phân trang 
export const paginationApi = async (currentPage)=>{
    const res = await axios.get('http://127.0.0.1:8000/api/pagnination/tour?page=' + currentPage);
    return res.data.data;
}
// Api tìm kiếm
export const searchApi = async (nameTour)=>{
    const res = await axios.get(`http://127.0.0.1:8000/api/search?name=${nameTour}`)
    return res.data;
}
//Api tỉnh thành 
export const locationApi = async (mien)=>{
    const res = await axios.get(`http://127.0.0.1:8000/api/location/${mien}`)
    return res.data.data;
}
//Api chi tiết tour
export const detailTourApi = async (id) =>{
    const res = await axios.get(`http://127.0.0.1:8000/api/detail/${id}`)
    return res.data.data;
}
// Api load ra tất cả tin tức trong danh sách tour
export const getNews = async ()=>{
    const res = await axios.get('http://127.0.0.1:8000/api/news');
    return res.data.data;
}
// Api chi tiết đơn hàng
export const getDetailOrder = async (id)=>{
    const res = await axios.get(`http://127.0.0.1:8000/api/order/detail/${id}`)
    return res.data.data;
}
//Api đơn đặt tour
export const getOrder = async (id)=>{
    const res = await axios.get(`http://127.0.0.1:8000/api/order/${id}`)
    return res.data.data;
}
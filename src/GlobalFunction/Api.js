import axios from "axios"

// Api load ra tất cả tour trong danh sách tour
export const getTour = async ()=>{
    const res = await axios.get('https://travel2h.click/public_html/api/tour');
    return res.data.data;
}
// Api đăng nhập
export const loginApi = async (email, password)=>{
    const res = await axios.post('https://travel2h.click/public_html/api/login',{
        email,
        password,
    })
    return res.data;
}
// Api đăng ký
export const registerApi = async (customer_name,email,password)=>{
    const res = await axios.post('https://travel2h.click/public_html/api/signup',{
        customer_name,
        email,
        password,
    })
    return res.data;
}
//Api phân trang 
export const paginationApi = async (currentPage)=>{
    const res = await axios.get('https://travel2h.click/public_html/api/pagnination/tour?page=' + currentPage);
    return res.data.data;
}
// Api tìm kiếm
export const searchApi = async (nameTour)=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/search?name=${nameTour}`)
    return res.data;
}
//Api tỉnh thành 
export const locationApi = async (mien)=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/location/${mien}`)
    return res.data.data;
}
//Api chi tiết tour
export const detailTourApi = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/detail/${id}`)
    return res.data.data;
}
// Api load ra tất cả tin tức trong danh sách tour
export const getNews = async ()=>{
    const res = await axios.get('https://travel2h.click/public_html/api/news');
    return res.data.data;
}
// Api chi tiết đơn hàng
export const getDetailOrder = async (id)=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/order/detail/${id}`)
    return res.data.data;
}
//Api đơn đặt tour theo id
export const getOrder = async (id)=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/order/${id}`)
    return res.data.data;
}
// Api đơn đặt tour

export const getOrderTour = async ()=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/order`)
    return res.data.data;
}
//Api số lượng data của table

export const getQuantityData = async ()=>{
    const res = await axios.get(`https://travel2h.click/public_html/api/analytic/quantityData`)
    return res.data;
}
//Api chi tiếtkhách hàng
export const detailCustomerApi = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/user/detail/${id}`)
    return res.data.data;
}
//Api chi tiếtkhách hàng
export const detailCustomerSocial = async (email) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/user/social/${email}`)
    return res.data;
}
//Api chi tiết tin tức
export const detailNews = async (id) =>{
    const res = await axios.get(`https://travel2h.click/public_html/api/news/detail/${id}`)
    return res.data.data;
}
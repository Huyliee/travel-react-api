import HomePage from "~/pages/Home";
import Login from "~/pages/Login";
import Tour from "~/pages/Tour";
import AdminLayout from "~/component/Layout/AdminLayout";
import HomeAdmin from "~/pages/HomeAdmin";
import TourAdmin from "~/pages/TourAdmin";
import UserAdmin from "~/pages/UserAdmin";
import Register from "~/pages/Home/Register";
import Contact from "~/pages/Contact";
import DetailTour from "~/pages/DetailTour";
import NewsAdmin from "~/pages/NewsAdmin";
import News from "~/pages/News";
import Booking from "~/pages/Booking";
import PayMothods from "~/pages/Booking/PaymentMethods";
import PaymentSuccess from "~/pages/Booking/PaymentSuccess";
import Profile from "~/pages/Profile";
import ProfileLayout from "~/component/Layout/ProfileLayout";
import Order from "~/pages/Profile/Order";
import OrderAdmin from "~/pages/OrderAdmin";
// import { useState , useEffect } from "react";
// import { getTour } from "~/GlobalFunction/Api";


// const [products, setProduct] = useState([]);
// useEffect(() => {
//   async function loadTour() {
//     const data = await getTour();
//     setProduct(data);
//   }
//   loadTour();
// }, []);

const publicRoutes = [
    {path: '/' , component:HomePage},
    {path: '/login' , component:Login},
    {path: '/signup' , component:Register},
    {path: '/tour' , component:Tour},
    {path: '/contact' , component:Contact},
    {path: '/news' , component:News},
    {path: '/detail/:id' , component:DetailTour},
    {path: '/booking/tourId/:id' , component:Booking},
    {path: '/booking/payment/:idBooking/idTour/:idTour' , component:PayMothods},
    {path: '/booking/payment/success' , component:PaymentSuccess},
    {path: '/profile' , component:Profile , layout:ProfileLayout},
    {path: '/profile/order' , component:Order , layout:ProfileLayout},
]

const privateRoutes =[
    {path: '/admin' , component:HomeAdmin , layout:AdminLayout},
    {path: '/admin/tour' , component:TourAdmin , layout:AdminLayout},
    {path: '/admin/user' , component:UserAdmin , layout:AdminLayout},
    {path: '/admin/news' , component:NewsAdmin , layout:AdminLayout},
    {path: '/admin/order' , component:OrderAdmin , layout:AdminLayout},
]

export {publicRoutes,privateRoutes}
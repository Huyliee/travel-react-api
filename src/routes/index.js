import HomePage from "~/pages/Home";
import Login from "~/pages/Login";
import Tour from "~/pages/Tour";
import AdminLayout from "~/component/Layout/AdminLayout";
import HomeAdmin from "~/pages/HomeAdmin";
import TourAdmin from "~/pages/TourAdmin";
import UserAdmin from "~/pages/UserAdmin";

const publicRoutes = [
    {path: '/' , component:HomePage},
    {path: '/login' , component:Login},
    {path: '/tour' , component:Tour},

]

const privateRoutes =[
    {path: '/admin' , component:HomeAdmin , layout:AdminLayout},
    {path: '/admin/tour' , component:TourAdmin , layout:AdminLayout},
    {path: '/admin/user' , component:UserAdmin , layout:AdminLayout},
]

export {publicRoutes,privateRoutes}
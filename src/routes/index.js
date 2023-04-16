import HomePage from "~/pages/Home";
import Login from "~/pages/Login";
import Tour from "~/pages/Tour";
import AdminLayout from "~/component/Layout/AdminLayout";
import HomeAdmin from "~/pages/HomeAdmin";
import TourAdmin from "~/pages/TourAdmin";

const publicRoutes = [
    {path: '/' , component:HomePage},
    {path: '/login' , component:Login},
    {path: '/tour' , component:Tour},
    {path: '/admin' , component:HomeAdmin , layout:AdminLayout},
    {path: '/admin/tour' , component:TourAdmin , layout:AdminLayout},
]

const privateRoutes =[

]

export {publicRoutes,privateRoutes}
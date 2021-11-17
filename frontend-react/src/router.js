import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/Home/Home";

export const routes = [
    {path: '/auth', component: Authentication},
    {path: '/home', component: Home},
    {path:'/', exact:true, redirectTo:localStorage.getItem("user") ? '/home' : '/auth'},
]
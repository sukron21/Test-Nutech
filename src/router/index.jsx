import React from "react";
import { BrowserRouter,Routes, Route, Navigate, Outlet  } from "react-router-dom";
import Auth from "../views/Auth";
import Home from "../views/Home"
import Profile from "../views/Profile"
import Update from "../views/Update"

const Index = () =>{
    const PrivateRoute = () => {
        const token = localStorage.getItem("token");
        if (token) {
            return <Outlet/>
        } else {
            alert("Anda harus login terlebih dahulu")
            return <Navigate to="/" />;
        }
    };
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Auth/>}/>
                <Route path="home" element={<PrivateRoute/>} >
			    <Route index element={<Home />} />
                </Route>
                <Route path="/Profile" element={<PrivateRoute />}>
                <Route index element={<Profile />} />
                </Route>
                <Route path="/Update/:id" element={<PrivateRoute />}>
          <Route index element={<Update />} />
          </Route>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Index
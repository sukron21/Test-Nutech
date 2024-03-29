import React from "react";
import { BrowserRouter,Routes, Route, Navigate, Outlet  } from "react-router-dom";
import Auth from "../views/Auth";
import Home from "../views/Home"
import Update from "../views/Update"
import Hal2 from "../views/hal2"
import Searching from "../views/searching"
import { useSelector } from "react-redux";

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
                <Route path="/Update/:id" element={<PrivateRoute />}>
                <Route index element={<Update />} />
                </Route>
                <Route path="/hal2" element={<PrivateRoute />}>
                <Route index element={<Hal2/>} />
                </Route>
                <Route path="/searching" element={<PrivateRoute />}>
                <Route index element={<Searching/>} />
                </Route>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Index
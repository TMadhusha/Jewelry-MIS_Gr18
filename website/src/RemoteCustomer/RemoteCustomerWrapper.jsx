import React from "react"
import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import LoggedNavBar from "../RemoteCustomer/LoggedNavBar";

const RemoteCustomerWrapper = () =>{
    return(
        <div>
        <LoggedNavBar/>
            <Outlet/>
        <Footer/>
        </div>
    )
}
export default RemoteCustomerWrapper
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10 p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;
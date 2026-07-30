import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import AssetPage from "../pages/assets/AssetPage";
import AdminLayout from "../layouts/AdminLayout";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
            <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assets" element={<AssetPage />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import AssetPage from "../pages/assets/AssetPage";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/login" element={<Login />} />

            <Route 
            path="/dashboard" 
            element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } 
            />
            <Route 
            path="/assets" 
            element={
                <ProtectedRoute>
                    <AssetPage />
                </ProtectedRoute>
            } 
            />

        </Routes>
        
    );
}

export default AppRoutes;
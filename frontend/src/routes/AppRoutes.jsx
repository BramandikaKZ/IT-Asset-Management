import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import AssetPage from "../pages/assets/AssetPage";
import EmployeePage from "../pages/employee/EmployeePage";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import AssetDetailPage from "../pages/assets/AssetDetailPage"
import CategoryPage from "../pages/category/CategoryPage";
import BrandPage from "../pages/brand/BrandPage";

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
            <Route
                path="/assets/:id" 
                element={<AssetDetailPage/>}
            />
            <Route 
                path="/employees"
                element={<EmployeePage />}
            />
            <Route
                path="/categories"
                element={
                    <ProtectedRoute>
                        <CategoryPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/brands"
                element={
                    <ProtectedRoute>
                        <BrandPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
        
    );
}

export default AppRoutes;
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            // Nanti kita ambil data user dari backend
            console.log("Token ditemukan:", token);
        }
    }, [token]);

    const login = (userData, jwtToken) => {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider 
        value={{ 
            user, 
            setUser,
            login,
            logout,
            isAuthenticated: !!token,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
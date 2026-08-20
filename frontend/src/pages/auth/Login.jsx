import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await authService.login(username, password);
            // Handle successful login (e.g., store token, redirect)
            login(result.user, result.token);
            navigate("/dashboard");
        } catch (error) {
            // Handle login error
            setError(
                error.response?.data?.message ||
                "Login gagal"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow p-4" style={{ width: '400px' }}>
            <h2 className="text-center mb-4">IT Asset Management</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                    {error && (
                        <div className="alert alert-danger mt-2" role="alert">
                            {error}
                        </div>
                    )}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? (
                        <>
                        <span
                            className="spinner-border spinner-border-sm me-2"
                            aria-hidden="true"
                        ></span>
                        Loading...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </div>
    </div>    
    )
}

export default Login;

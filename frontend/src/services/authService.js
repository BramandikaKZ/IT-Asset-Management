import api from "./api";

const authService = {
    async login(username, password) {
        const response = await api.post("/auth/login", { 
            username, 
            password 
        });
        return response.data;
    },
};

export default authService;
import api from "./api";

const dashboardService = {
    async getTotalAssets() {
        const response = await api.get("/assets/stats/total");
        return response.data;
    },

    async getAssetsByStatus() {
        const response = await api.get("/assets/stats/status");
        return response.data;
    },

    async getAssetsByCategory() {
        const response = await api.get("/assets/stats/category");
        return response.data;
    }
};

export default dashboardService;
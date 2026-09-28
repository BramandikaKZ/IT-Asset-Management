import api from "./api";

const assetService = {
    async getAllAssets() {
        const response = await api.get("/assets");
        return response.data;
    },

    async getPublicAssetById(id) {
        const response = await api.get(`/assets/public/${id}`);
        return response.data;
    },

    async createAsset(data) {
        const response = await api.post("/assets", data);
        return response.data;
    },

    async updateAsset(id, data) {
        const response = await api.put(`/assets/${id}`, data);
        return response.data;
    },

    async deleteAsset(id) {
        const response = await api.delete(`/assets/${id}`);
        return response.data;
    },

    async exportAssetsToExcel(filters = {}) {
        const response = await api.get("/assets/export/excel", {
            params: filters,
            responseType: "blob",
        });
        return response;
    },

    async exportAssetsToPDF(filters = {}) {
        const response = await api.get("/assets/export/pdf", {
            params: filters,
            responseType: "blob",
        });
        return response;
    },
};

export default assetService;

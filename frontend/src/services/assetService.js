import api from "./api";

const assetService = {
    async getAllAssets() {
            const response = await api.get("/assets");
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
    }

};

export default assetService;
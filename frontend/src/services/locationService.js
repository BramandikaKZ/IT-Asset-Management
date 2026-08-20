import api from "./api";

const locationService = {
    async getAllLocations() {
        const response = await api.get("/locations");
        return response.data;
    }
};

export default locationService;
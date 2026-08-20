import api from "./api";

const brandService = {

    async getAllBrands() {
        const response = await api.get("/brands");
        return response.data;
    }

};

export default brandService;
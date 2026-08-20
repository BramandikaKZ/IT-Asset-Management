import api from "./api";

const categoryService = {

    async getAllCategories() {
        const response = await api.get("/categories");
        return response.data;
    }

};

export default categoryService;
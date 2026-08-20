import api from "./api";

const divisionService = {

    async getAllDivisions() {
        const response = await api.get("/divisions");
        return response.data;
    }

};

export default divisionService;
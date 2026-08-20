import api from "./api";

const statusService = {

    async getAllStatuses() {
        const response = await api.get("/statuses");
        return response.data;
    }

};

export default statusService;
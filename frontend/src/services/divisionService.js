import api from "./api";

export const getDivisions = async () => {
    const response = await api.get("/divisions");
    return response.data;
};

export default {
    getDivisions,
};
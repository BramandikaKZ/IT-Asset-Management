
import api from "./api";

export const getLocations = async () => {
    const response = await api.get("/locations");
    return response.data;
};

export const createLocation = async (locationData) => {
    const response = await api.post("/locations", locationData);
    return response.data;
};

export const updateLocation = async (id, locationData) => {
    const response = await api.put(`/locations/${id}`, locationData);
    return response.data;
};

export const deleteLocation = async (id) => {
    const response = await api.delete(`/locations/${id}`);
    return response.data;
};

export default {
    getLocations,
    createLocation,
    updateLocation,
    deleteLocation,
};

import axios from 'axios';
const api = axios.create({
    baseURL: "/api",
});

export const createHome = payload => api.post(`/home`, payload);
export const getHomes = () => api.get(`/homes`);
export const getNeighbourhoods = () => api.get(`/neighbourhoods`);
export const updateHome = (id, payload) => api.put(`/home/${id}`, payload);
export const deleteHome = id => api.delete(`/home/${id}`);
export const getHomeByID = id => api.get(`/home/${id}`);
export const getAverage = neighbourhood => api.get(`/average/${neighbourhood}`);

const apis = {
    createHome,
    getHomes,
    getNeighbourhoods,
    updateHome,
    deleteHome,
    getHomeByID,
    getAverage
}

export default apis;
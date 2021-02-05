import axios from 'axios';
console.log(process.env.REACT_APP_API_URL);
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
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
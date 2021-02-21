import axios from 'axios';

export const createHome = payload => axios.post(`/api/home`, payload);
export const getHomes = () => axios.get(`/api/homes`);
export const getNeighbourhoods = () => axios.get(`/api/neighbourhoods`);
export const updateHome = (id, payload) => axios.put(`/api/home/${id}`, payload);
export const deleteHome = id => axios.delete(`/api/home/${id}`);
export const getHomeByID = id => axios.get(`/api/home/${id}`);
export const getAverage = neighbourhood => axios.get(`/api/average/${neighbourhood}`);

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
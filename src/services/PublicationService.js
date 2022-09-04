import http from "../http-common";

const getAll = () => {
  return http.get("/publication/list");
};

const get = (id) => {
  return http.get(`/publication/${id}`);
};

const create = (data) => {
  return http.post("/publication", data);
};

const update = (id, data) => {
  return http.put(`/publication/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/publication/${id}`);
};

const removeAll = () => {
  return http.delete(`/publication`);
};

const findByNombre = (nombre) => {
  return http.get(`/publication?nombre=${nombre}`);
};

const PublicationService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNombre: findByNombre,
};

export default PublicationService;

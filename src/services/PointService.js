import http from "../http-common";

const getAll = () => {
  return http.get("/points/list");
};

const get = (id) => {
  return http.get(`/points/${id}`);
};

const create = (data) => {
  return http.post("/points", data);
};

const update = (id, data) => {
  return http.put(`/points/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/points/${id}`);
};

const removeAll = () => {
  return http.delete(`/points`);
};

const findByNombre = (nombre) => {
  return http.get(`/points?nombre=${nombre}`);
};

const PointService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNombre: findByNombre,
};

export default PointService;

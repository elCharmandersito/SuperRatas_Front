import http from "../http-common";

const getAll = () => {
  return http.get("/business/list");
};

const get = (id) => {
  return http.get(`/business/${id}`);
};

const create = (data) => {
  return http.post("/business", data);
};

const update = (id, data) => {
  return http.put(`/business/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/business/${id}`);
};

const removeAll = () => {
  return http.delete(`/business`);
};

const findByNombre = (nombre) => {
  return http.get(`/business?nombre=${nombre}`);
};

const BusinessService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNombre: findByNombre,
};

export default BusinessService;

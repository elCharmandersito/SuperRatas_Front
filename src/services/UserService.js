import http from "../http-common";

const getAll = () => {
  return http.get("/user/list");
};

const get = (id) => {
  return http.get(`/user/${id}`);
};

const create = (data) => {
  return http.post("/user", data);
};

const update = (id, data) => {
  return http.put(`/user/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/user/${id}`);
};

const removeAll = () => {
  return http.delete(`/user`);
};

const findByNombre = (nombre) => {
  return http.get(`/user?nombre=${nombre}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNombre: findByNombre,
};

export default UserService;

import http from "../http-common";

const getAll = () => {
  return http.get("/sellings/list");
};

const get = (id) => {
  return http.get(`/sellings/${id}`);
};

const create = (IdPublicacion, data) => {
  return http.post(`/sellings/add/${IdPublicacion}`, data);
};

const SellingService = {
  getAll,
  get,
  create
};

export default SellingService;

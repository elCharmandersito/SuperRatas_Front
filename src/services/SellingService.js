import http from "../http-common";

const getAll = () => {
  return http.get("/sellings/list");
};

const get = (id) => {
  return http.get(`/sellings/${id}`);
};

const create = (data) => {
  return http.post("/sellings", data);
};

const SellingService = {
  getAll,
  get,
  create
};

export default SellingService;

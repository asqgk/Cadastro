import http from "../http-common";

class ProdutoDataService {
    getAll() {
      return http.get("/produto");
    }
  
    get(id) {
      return http.get(`/produto/${id}`);
    }
  
    create(data) {
      return http.post("/produto", data);
    }
  
    update(id, data) {
      return http.put(`/produto/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/produto/${id}`);
    }
  
    deleteAll() {
      return http.delete(`/produto`);
    }
  
    findByNome(nome) {
      return http.get(`/produto?nome=${nome}`);
    }
  }
  
  export default new ProdutoDataService();
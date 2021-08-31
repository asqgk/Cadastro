import http from "../http-common";

class PessoaDataService {
  getAll() {
    return http.get("/pessoa");
  }

  create(data) {
    return http.post("/pessoa", data);
  }

  findByNome(nome) {
    return http.get(`/pessoa?nome=${nome}`);
  }
}

export default new PessoaDataService();
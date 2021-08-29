<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="nome">Produto</label>
        <input
          type="text"
          class="form-control"
          id="nome"
          required
          v-model="produto.nome"
          name="nome"
        />
      </div>

      <div class="form-group">
        <label for="descricao">Descrição</label>
        <input
          class="form-control"
          id="descricao"
          required
          v-model="produto.descricao"
          name="descricao"
        />
      </div>   

      <button @click="newProduto"  class="btn btn-success"  style= "margin-left: 20px; margin-right: 0px;" >Descartar</button>
      <button @click="saveProduto" class="btn btn-success" style= "margin-left: 20px; margin-right: 0px;" >Cadastrar</button>        
    </div>

    <div v-else>
      <div class="form-group">
      <h4>Cadastrado com Sucesso!</h4>
      <button @click="newProduto" class="btn btn-success">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProdutoDataService from "../services/ProdutoDataService";

export default {
  name: "add-produto",
  data() {
    return {
      produto: {
        id: null,
        nome: "",
        descricao: "",
        status: false
      },
      submitted: false
    };
  },
  methods: {
    saveProduto() {
      var data = {
        nome: this.produto.nome,
        descricao: this.produto.descricao
      };

      ProdutoDataService.create(data)
        .then(response => {
          this.produto.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newProduto() {
      this.submitted = false;
      this.produto = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
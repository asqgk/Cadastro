<template>
  <div v-if="ProdutoAtual" class="edit-form">
    <h4>Produto</h4>
    <form>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" id="nome"
          v-model="ProdutoAtual.nome"
        />
      </div>
      <div class="form-group">
        <label for="descricao">Descrição</label>
        <input type="text" class="form-control" id="descricao"
          v-model="ProdutoAtual.descricao"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ ProdutoAtual.status ? "Confirmado" : "Pendente" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="ProdutoAtual.status"
      @click="updateStatus(false)"
    >
      Pendente
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateStatus(true)"
    >
      Confirmar
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteProduto"
    >
      Deletar
    </button>

    <button type="submit" class="badge badge-success" @click="updateProduto">Atualizar</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor escolha um produto...</p>
  </div>
</template>

<script>
import ProdutoDataService from "../services/ProdutoDataService";

export default {
  name: "produto",
  data() {
    return {
      ProdutoAtual: null,
      message: ''
    };
  },
  methods: {
    getProduto(id) {
      ProdutoDataService.get(id)
        .then(response => {
          this.ProdutoAtual = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateStatus(status) {
      var data = {
        id: this.ProdutoAtual.id,
        nome: this.ProdutoAtual.nome,
        descricao: this.ProdutoAtual.descricao,
        status: status
      };

      ProdutoDataService.update(this.ProdutoAtual.id, data)
        .then(response => {
          this.ProdutoAtual.status = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateProduto() {
      ProdutoDataService.update(this.ProdutoAtual.id, this.ProdutoAtual)
        .then(response => {
          console.log(response.data);
          this.message = 'O produto foi atualizado com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteProduto() {
      ProdutoDataService.delete(this.ProdutoAtual.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "produtos" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getProduto(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
<template>
  <div class="list row">
    
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Procurar produto por nome"
          v-model="nome"/>
        <div class="input-group-append">
          <button @click="searchNome" class="btn btn-outline-secondary" type="button">Procurar</button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Produtos Cadastrados</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(produto, index) in produtos"
          :key="index"
          @click="setActiveProduto(produto, index)"
        >
          {{ produto.nome }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllProdutos">
        Deletar todos
      </button>
    </div>
    
    <div class="col-md-6">
      <div v-if="ProdutoAtual">
        <h4>Produtos</h4>
        <div>
          <label><strong>Produto:</strong></label> {{ ProdutoAtual.nome }}
        </div>
        <div>
          <label><strong>Descrição:</strong></label> {{ ProdutoAtual.descricao }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ ProdutoAtual.status ? "Confirmado" : "Pendente" }}
        </div>

        <a class="badge badge-warning"
          :href="'/produtos/' + ProdutoAtual.id"
        >
          Editar
        </a>
      </div>
      <div v-else>
        <br />
        <p>Por favor selecione um produto...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProdutoDataService from "../services/ProdutoDataService";

export default {
  name: "produtos-list",
  data() {
    return {
      produtos: [],
      ProdutoAtual: null,
      currentIndex: -1,
      nome: ""
    };
  },
  methods: {
    retrieveProdutos() {
      ProdutoDataService.getAll()
        .then(response => {
          this.produtos = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProdutos();
      this.ProdutoAtual = null;
      this.currentIndex = -1;
    },

    setActiveProduto(produto, index) {
      this.ProdutoAtual = produto;
      this.currentIndex = index;
    },

    removeAllProdutos() {
      ProdutoDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchNome() {
      ProdutoDataService.findByNome(this.nome)
        .then(response => {
          this.produtos = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveProdutos();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
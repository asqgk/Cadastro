<template>
  <div class="list row">
    
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Procurar pessoa por nome"
          v-model="nome"/>
        <div class="input-group-append">
          <button @click="searchNome" class="btn btn-outline-secondary" type="button">Procurar</button>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <h4>Pessoas Cadastradas</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(pessoa, index) in pessoas"
          :key="index"
          @click="setActivePessoa(pessoa, index)"
        >
          {{ pessoa.nome }}
        </li>
      </ul>
    </div>
    
    <div class="col-md-6">
      <div v-if="PessoaAtual">
        <h4>Pessoa</h4>
        <div>
          <label><strong>Nome:</strong></label> {{ PessoaAtual.nome }}
        </div>
        <div>
          <label><strong>Sobrenome:</strong></label> {{ PessoaAtual.sobrenome }}
        </div>
        <div>
          <label><strong>Sexo:</strong></label> {{ PessoaAtual.sexo }}
        </div>
        <div>
          <label><strong>Data Nascimento:</strong></label> {{ PessoaAtual.datanascimento }}
        </div>
        <div>
          <label><strong>Numero:</strong></label> {{ PessoaAtual.numero }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ PessoaAtual.status ? "Pode votar" : "Não pode votar" }}
        </div>        
      </div>
      <div v-else>
        <br />
        <p>Por favor selecione uma pessoa...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PessoaDataService from "../services/PessoaDataService";

export default {
  name: "pessoas-list",
  data() {
    return {
      pessoas: [],
      PessoaAtual: null,
      currentIndex: -1,
      nome: ""
    };
  },
  methods: {
    retrievePessoas() {
      PessoaDataService.getAll()
        .then(response => {
          this.pessoas = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePessoas();
      this.PessoaAtual = null;
      this.currentIndex = -1;
    },

    setActivePessoa(pessoa, index) {
      this.PessoaAtual = pessoa;
      this.currentIndex = index;
    },
    
    searchNome() {
      PessoaDataService.findByNome(this.nome)
        .then(response => {
          this.pessoas = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePessoas();
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
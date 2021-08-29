<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <!-- NOME -->
      <div class="form-group">
        <label for="nome">Nome</label>
        <input
          type="text"
          class="form-control"
          id="nome"
          required
          v-model="pessoa.nome"
          name="nome"
        />
      </div>
      <!-- SOBRENOME -->
      <div class="form-group">
        <label for="sobrenome">Sobrenome</label>
        <input
          class="form-control"
          id="sobrenome"
          required
          v-model="pessoa.sobrenome"
          name="sobrenome"
        />
      </div>
      <!-- SEXO -->
      <div class="form-group">
        <label for="sexo">Sexo</label>
        <!-- <input
          class="form-control"
          id="sexo"
          required
          v-model="pessoa.sexo"
          name="sexo"
        /> -->
        <select class="form-control" id="sexo" required v-model="pessoa.sexo" name="sexo">
          <option>Masculino</option>
          <option>Feminino</option>
          <option>Outro</option>
        </select>
      </div>
      <!-- DATA DE NASCIMENTO -->
      <div class="form-group">
        <label for="datanascimento">Data de nascimento</label>
        <input
          class="form-control"
          id="datanascimento"
          required
          v-model="pessoa.datanascimento"
          v-mask="'##/##/####'"
          placeholder="DD/MM/AAAA"
          name="datanascimento"
        />
      </div>
      <!-- NUMERO -->
      <div class="form-group">
        <label for="numero">Numero</label>
        <input
          class="form-control"
          id="numero"
          required
          v-model="pessoa.numero"
          v-mask="'+55 (##) #####-####'"
          placeholder="(99) 99999-9999"
          name="numero"
        />
      </div>

      <button
        @click="savePessoa"
        class="btn btn-success"
        style="margin-left: 20px; margin-right: 0px;"
      >
        Cadastrar
      </button>
      <button
        @click="newPessoa"
        class="btn btn-danger"
        style="margin-left: 20px; margin-right: 0px;"
      >
        Descartar
      </button>
    </div>

    <div v-else>
      <div class="form-group">
        <h4>Cadastrado com Sucesso!</h4>
        <button @click="newPessoa" class="btn btn-success">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script>
import PessoaDataService from "../services/PessoaDataService";

export default {
  name: "add-pessoa",
  data() {
    return {
      pessoa: {
        id: null,
        nome: "",
        sobrenome: "",
        sexo: "",
        datanascimento: "",
        numero: "",
        status: false
      },
      submitted: false
    };
  },
  methods: {
    savePessoa() {
      var data = {
        nome: this.pessoa.nome,
        sobrenome: this.pessoa.sobrenome,
        sexo: this.pessoa.sexo,
        datanascimento: this.pessoa.datanascimento,
        numero: this.pessoa.numero
      };

      PessoaDataService.create(data)
        .then(response => {
          this.pessoa.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newPessoa() {
      this.submitted = false;
      this.pessoa = {};
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

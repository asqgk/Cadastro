<template>
  <div class="col-md-12">
    <div class="submit-form">
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="nome">Nome*</label>
            <input
              v-model="pessoa.nome"
              v-validate="'required'"
              placeholder="Digite seu nome"
              type="text"
              class="form-control"
              id="nome"
              name="nome"
            />
            <div v-if="submitted && errors.has('nome')" class="alert-danger">
              Campo Obrigatório.
            </div>
          </div>
          <div class="form-group">
            <label for="sobrenome">Sobrenome*</label>
            <input
              v-model="pessoa.sobrenome"
              v-validate="'required'"
              placeholder="Digite seu sobrenome"
              type="text"
              class="form-control"
              name="sobrenome"
            />
            <div
              v-if="submitted && errors.has('sobrenome')"
              class="alert-danger"
            >
              Campo Obrigatório.
            </div>
          </div>
          <div class="form-group">
            <label for="sexo">Sexo*</label>
            <select
              v-model="pessoa.sexo"
              v-validate="'required'"
              class="form-control"
              id="sexo"
              name="sexo"
            >
              <option>Masculino</option>
              <option>Feminino</option>
              <option>Outro</option>
            </select>
            <div v-if="submitted && errors.has('sexo')" class="alert-danger">
              Campo Obrigatório.
            </div>
          </div>
          <div class="form-group">
            <label for="datanascimento">Data de nascimento*</label>
            <input
              v-model="pessoa.datanascimento"
              v-validate="'required|min:10'"
              placeholder="DD/MM/AAAA"
              type="date"
              class="form-control"
              id="datanascimento"
              name="datanascimento"
            />
            <div
              v-if="submitted && errors.has('datanascimento')"
              class="alert-danger"
            >
              Campo Obrigatório.
            </div>
          </div>
          <div class="form-group">
            <label for="numero">Numero*</label>
            <input
              v-model="pessoa.numero"
              v-validate="'required|min:19'"
              v-mask="'+55 (##) #####-####'"
              placeholder="(99) 99999-9999"
              class="form-control"
              id="numero"
              name="numero"
            />
            <div v-if="submitted && errors.has('numero')" class="alert-danger">
              Campo Obrigatório.
            </div>
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

        <div v-if="successful">
          <div class="form-group">
            <h4>Cadastrado com Sucesso!</h4>
            <button @click="newPessoa" class="btn btn-success">
              Continuar
            </button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}        
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
      submitted: false,
      successful: false,
      message: ""
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
          this.successful = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newPessoa() {
      this.successful = false;
      this.submitted = false;
      this.pessoa = {};
    },

    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          data => {
            this.message = data.message;
            this.successful = true;
          },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            };
        }
      });
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

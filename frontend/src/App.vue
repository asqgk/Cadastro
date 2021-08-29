<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>Cadastro Pessoas</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            Home
          </router-link>
        </li>    

        <!-- PRODUTOS -->
        <!-- <li v-if="MostrarProdutos" class="nav-item">
          <router-link to="/produtos" class="nav-link">Produtos</router-link>
        </li>  -->
        <!-- PESSOAS -->
        <li class="nav-item">
          <router-link to="/pessoas" class="nav-link">Pessoas</router-link>
        </li>
        <!-- CADASTROS -->
        <!-- <li class="nav-item">
          <router-link v-if="UsuarioAtual" to="/add" class="nav-link">Cadastrar</router-link>
        </li> -->
        <li class="nav-item">
          <router-link v-if="UsuarioAtual" to="/add_pessoa" class="nav-link">Cadastrar</router-link>
        </li>

        
      </div>

      <div v-if="!UsuarioAtual" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Cadastro
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Login
          </router-link>
        </li>
      </div>

      <div v-if="UsuarioAtual" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">            
            {{ UsuarioAtual.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            Sair
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    UsuarioAtual() {
      return this.$store.state.auth.usuario;
    },
    MostrarProdutos() {
      if (this.UsuarioAtual && this.UsuarioAtual.tipousuarios) {
        return this.UsuarioAtual.tipousuarios.includes('TIPOUSUARIO_ADMIN');
      }

      return false;
    }    
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar.navbar-expand.navbar-dark.bg-dark{
      margin-bottom: 50px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;  
}
</style>
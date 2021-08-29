<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{UsuarioAtual.username}}</strong> Perfil
      </h3>
    </header>
    <div class="list">
    <p>
      <strong>Token:</strong>
      {{UsuarioAtual.accessToken}}
    </p>
    <p>
      <strong>Id:</strong>
      {{UsuarioAtual.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{UsuarioAtual.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(tipousuarios,index) in UsuarioAtual.tipousuarios" :key="index">{{tipousuarios}}</li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    UsuarioAtual() {
      return this.$store.state.auth.usuario;
    }
  },
  mounted() {
    if (!this.UsuarioAtual) {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.list {
  text-align: left;  
}
</style>
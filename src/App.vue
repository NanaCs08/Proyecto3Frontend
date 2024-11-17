<template>
  <div id="app">
    <header class="cover">
      <h1>Proyecto 3: Sistemas Distribuidos</h1>
      <p>Dania Céspedes Solís y Biron Aguilar Rodríguez</p>
    </header>
    <nav>
      <router-link to="/aerolineas">Aerolineas</router-link>
      <router-link to="/aviones">Aviones</router-link>
      <router-link to="/fabricantes">Fabricantes</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.cover {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.cover h1 {
  font-size: 2rem;
  margin: 0;
}

.cover p {
  font-size: 1.2rem;
  color: #555;
  margin: 5px 0 0;
}

nav {
  margin: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #35495e;
}
</style>

<template>
  <div id="app">
    <nav>
      <router-link to="/authors">Authors</router-link>
      <router-link to="/publishers">Publishers</router-link>
      <router-link to="/books">Books</router-link>
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

import { createRouter, createWebHashHistory } from 'vue-router';
import AerolineasList from '../components/Aerolineas.vue';
import AvionesList from '../components/Aviones.vue';
import FabricantesList from '../components/Fabricantes.vue';

const routes = [
  { path: '/aerolineas', component: AerolineasList },
  { path: '/aviones', component: AvionesList },
  { path: '/fabricantes', component: FabricantesList }
];

const router = createRouter({
  history: createWebHashHistory(), // Usar hash mode
  routes
});

export default router;

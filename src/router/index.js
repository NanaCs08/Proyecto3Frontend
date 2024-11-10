import { createRouter, createWebHashHistory } from 'vue-router';
import AuthorsList from '../components/Authors.vue';
import PublishersList from '../components/Publishers.vue';
import BooksList from '../components/Book.vue';

const routes = [
  { path: '/authors', component: AuthorsList },
  { path: '/publishers', component: PublishersList },
  { path: '/books', component: BooksList }
];

const router = createRouter({
  history: createWebHashHistory(), // Usar hash mode
  routes
});

export default router;

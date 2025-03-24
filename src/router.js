import { createRouter, createWebHistory } from 'vue-router';
import ContactList from './components/ContactList.vue';
import AddContact from './components/AddContact.vue';
import EditContact from './components/EditContact.vue';
import ViewContact from './components/ViewContact.vue';

const routes = [
    { path: '/', component: ContactList },
    { path: '/add', component: AddContact },
    { path: '/edit/:id', component: EditContact },
    { path: '/contact/:id', component: ViewContact },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

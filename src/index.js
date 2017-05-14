import 'normalize.css/normalize.css';
import './common.css';
import Vue from 'Vue';
import App from './app/App.vue';

const root = new Vue({
    el: '#app',
    components: { App }
});

import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './common.css';
import Vue from 'Vue';
import App from './app/App.vue';

const root = new Vue({
    el: '#app',
    components: { App }
});


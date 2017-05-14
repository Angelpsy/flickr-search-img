import ApiConfig from './api/api.config';
import VueResource from 'vue-resource';
import Vue from 'Vue';
Vue.use(VueResource);

import assign from 'lodash/assign';

import ImgsList from './components/imgsList/imgsList.vue';
import Modal from './components/modal/modal.vue';
import Search from './components/search/search.vue';

const App = {
    data () {
        return {
            items: []
        }
    },
    components: {
        ImgsList,
        Modal,
        Search
    },
    methods: {
        updateItems: function (params) {
            const that = this;
            window.jsonFlickrApp = function(data) {
                that.items = data.items;
            };
            params = assign(
                params || {},
                {
                    jsoncallback: 'jsonFlickrApp'
                }
            );
            this.$http.jsonp(ApiConfig.baseUrl, {
                params
            }).then(response => {}, response => {});
        },
        searchImgByTags: function (tags) {
            this.updateItems({
                tags: tags
            });
        }
    },
    created: function () {
        this.updateItems();
    }
};
export default App;

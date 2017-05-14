import ApiConfig from './api/api.config';
import VueResource from 'vue-resource';
import Vue from 'Vue';
Vue.use(VueResource);

import assign from 'lodash/assign';

const App = {
    data () {
        return {
            items: []
        }
    },
    components: {},
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
        searchImgByTegs: function (tegs) {
            this.updateItems({
                tegs: tegs
            });
        }
    },
    created: function () {
        this.updateItems();
    }
};
export default App;

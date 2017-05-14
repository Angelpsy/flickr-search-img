const search = {
    data () {
        return {
            q: ''
        }
    },
    methods: {
        onSearch: function () {
            this.$emit('onSearch', this.q);
        },
        onSearchAll: function () {
            this.$emit('onSearch', '');
        }
    }
};
export default search;

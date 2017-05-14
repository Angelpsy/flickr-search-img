const search = {
    data () {
        return {
            q: ''
        }
    },
    methods: {
        onSearch: function () {
            this.$emit('onSearch', this.q);
        }
    }
};
export default search;

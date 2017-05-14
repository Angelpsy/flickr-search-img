import FlickImg from '../img/img.vue';

const imgsList = {
    data () {
        return {
            data: {},
        }
    },
    components: {
        FlickImg
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    }
};
export default imgsList;

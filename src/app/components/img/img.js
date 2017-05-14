import {bus} from '../bus/bus.js';
function getUrlImgSize(url, size) {
    if (!size) return url;
    const newUrl = url.substring(0, url.lastIndexOf('.') - 1) + size + url.substring(url.lastIndexOf('.'));
    return newUrl;
}

const img = {
    data () {
        return {}
    },
    computed: {
        img: function () {
            return {
                src: {
                    base: this.item.media.m,
                    medium: getUrlImgSize(this.item.media.m, 'c'),
                }
            }
        }
    },
    methods: {
        openModal: function () {
            bus.$emit('openModal', this.img);
        }
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        className: String,
    }
};
export default img;

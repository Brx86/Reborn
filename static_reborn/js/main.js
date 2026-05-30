const options = {
    data() {
        const params = new URLSearchParams(window.location.search);
        return {
            protocol: window.location.protocol || 'http:',
            url: window.location.host,
            lang: params.get('lang') || '',
        };
    },
    methods: {
        handleSelect(key) {
            const base = window.location.pathname;
            if (key == '1') {
                location.href = base;
            }
            else if (key == '2-1') {
                location.href = base;
            }
            else if (key == '2-2') {
                location.href = base + '?lang=en';
            }
            else if (key == '3') {
                window.open("https://github.com/Uahh/Reborn")
            }
        },
    },
    moduleCache: {
        vue: Vue
    },
    async getFile(url) {
        const res = await fetch(url);
        if (!res.ok)
            throw Object.assign(new Error(res.statusText + ' ' + url), { res });
        return {
            getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
        }
    },
    addStyle(textContent) {
        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
    components: {
        'world-map': Vue.defineAsyncComponent(() => loadModule('../static_reborn/js/map.vue', options)),
    },
}

const { loadModule } = window['vue3-sfc-loader'];
const V = Vue.createApp(options);
V.use(ElementPlus);
V.mount("#app");
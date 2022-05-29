//import checkPermission from '@/utils/permission'
export default {
    name: 'msgListing',
    data() {
        return {
            list: null,
            total_count: null,
            listLoading: true,
            listQuery: {
                page: 1,
                size: 10
            }
        }
    },
    watch: {
        $route: {
            handler(to, from) {
                if (this.$options.name === to.name) {
                    this.showMessageList();
                }
            },
            deep: true
        }
    },
    mounted() {
        this.showMessageList()
    },
    methods: {
        handlePageChange(value) {
            console.log(value)
            const { page, limit } = value;
            this.listQuery.page = page;
            this.listQuery.size = limit;
            this.showMessageList()
        }
    }
}
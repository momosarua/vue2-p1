<template>
    <div class="page">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 100, 200, 300, 400]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit("handleSizeChange", val)
        },
        handleCurrentChange(val) {
            this.$emit("handleCurrentChange", val)
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
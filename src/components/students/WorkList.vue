<template>
    <div class="workList">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                prop="id"
                label="用户ID"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="userId"
                label="所属班级"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="title"
                label="作业名称"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="completedText"
                label="完成情况"
                align="center"
            ></el-table-column>
        </el-table>
        <Page
            :currentPage="currentPage"
            :total="total"
            :pageSize="pageSize"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
        ></Page>
    </div>
</template>

<script>
import Page from "@/components/common/Page"
import { getWorkList } from "@/api/work";
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            total: 0,
            pageSize: 10,
        };
    },
    components: {
      Page
    },
    created() {
        this.getData({ page: this.currentPage, size: this.pageSize });
    },
    computed: {},
    methods: {
        getData(params) {
            getWorkList(params)
                .then((res) => {
                    this.tableData = res.data;
                    this.tableData.forEach((item) => {
                        item.completedText =
                            item.completed === true ? "是" : "否";
                    });
                    this.total = res.total;
                })
                .catch((err) => console.log(err, 111));
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getData({ page: this.currentPage, size: this.pageSize });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getData({ page: this.currentPage, size: this.pageSize });
        },
    },
};
</script>

<style lang="scss" scoped>
.workList {
    .demo-form-inline {
        text-align: left;
        display: flex;
        align-items: center;
        .el-form-item {
            margin: 20px 0;
        }
    }
    .el-pagination {
        text-align: left;
    }
}
</style>
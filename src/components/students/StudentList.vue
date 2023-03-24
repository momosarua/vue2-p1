<template>
    <div class="studentList">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="姓名">
                <el-input
                    v-model="formInline.name"
                    placeholder="请输入姓名查询"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="onCancel">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="compData" border style="width: 100%">
            <el-table-column
                prop="number"
                label="学号"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="sex_text"
                label="性别"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="age"
                label="年龄"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="class"
                label="班级"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="state_text"
                label="状态"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="address"
                label="地址"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="联系方式"
                align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        @click="deleteStu(scope.row)"
                    ></el-button>
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="editStu(scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
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
import { getStudentList, deleteStudent } from "@/api/students";
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            total: 0,
            pageSize: 10,
            formInline: {
                name: "",
            },
        };
    },
    created() {
        this.getData();
    },
    computed: {
        compData() {
            // 1-10, 11-20, 21-30, 10
            // 0-10, 10-20, 20-30, 10 下标
            // 10 * (1-1, 1) 10 * (2-1, 2)
            return this.tableData.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },
    },
    methods: {
        getData(params) {
            getStudentList(params)
                .then((res) => {
                    this.tableData = res.data;
                    this.tableData.forEach((item) => {
                        item.sex === 1
                            ? (item.sex_text = "男")
                            : (item.sex_text = "女");
                        item.state === "1"
                            ? (item.state_text = "已入学")
                            : item.state === "2"
                            ? (item.state_text = "未入学")
                            : (item.state_text = "休学中");
                    });
                    this.total = res.total;
                })
                .catch((err) => console.log(err, 111));
        },
        handleSizeChange(val) {
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        deleteStu(row) {
            this.$confirm(
                `此操作将永久删除学生${row.name}, 是否继续?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true,
                }
            )
                .then(() => {
                    deleteStudent(row.id)
                        .then((res) => {
                            this.getData();
                            this.$message({
                                type: "success",
                                message: res.message,
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "error",
                                message: "删除失败",
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        editStu(row) {
            console.log(row);
        },
        onSubmit() {
            this.getData(this.formInline)
        },
        onCancel() {
            this.formInline.name = "";
            this.getData()
        },
    },
};
</script>

<style lang="scss" scoped>
.studentList {
  .demo-form-inline {
    text-align: left;
    display: flex;
    align-items: center;
    .el-form-item {
      margin: 20px 0
    }
  }
    .el-pagination {
        text-align: left;
    }
}
</style>
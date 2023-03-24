<template>
    <div class="infoList">
        <div class="header">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                size="small"
            >
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible = true, type='add'"
                        >新增</el-button
                    >
                </el-form-item>
            </el-form>
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                size="small"
            >
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
        </div>

        <el-table :data="compData" border style="width: 100%">
            <el-table-column
                prop="id"
                label="id"
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
                prop="father"
                label="父亲"
                align="center"
            ></el-table-column>
            <el-table-column
                prop="mather"
                label="母亲"
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
            <el-table-column
                prop="time"
                label="入校时间"
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
                        @click="editInfoFn(scope.row)"
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
        <el-dialog title="添加学生信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item
                    label="姓名"
                    :label-width="formLabelWidth"
                    prop="name"
                >
                    <el-input
                        clearable
                        v-model="form.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="年龄"
                    :label-width="formLabelWidth"
                    prop="age"
                >
                    <el-input
                        clearable
                        v-model="form.age"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="性别"
                    :label-width="formLabelWidth"
                    prop="sex"
                >
                    <el-radio v-model="form.sex" label="1">男</el-radio>
                    <el-radio v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item
                    label="父亲姓名"
                    :label-width="formLabelWidth"
                    prop="father"
                >
                    <el-input
                        clearable
                        v-model="form.father"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="母亲姓名"
                    :label-width="formLabelWidth"
                    prop="mather"
                >
                    <el-input
                        clearable
                        v-model="form.mather"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="入校时间"
                    :label-width="formLabelWidth"
                    prop="time"
                >
                    <el-date-picker
                        v-model="form.time"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :default-value="defaultValue"
                        type="date"
                        placeholder="选择日期"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="家庭住址"
                    :label-width="formLabelWidth"
                    prop="address"
                >
                    <el-input
                        clearable
                        v-model="form.address"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="联系方式"
                    :label-width="formLabelWidth"
                    prop="phone"
                >
                    <el-input
                        clearable
                        :maxlength="11"
                        v-model="form.phone"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addInfoFn('ruleForm')"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getInfoList, addInfo, deleteInfo, editInfo } from "@/api/info";
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
            dialogFormVisible: false,
            form: {
                name: "鼠鼠",
                age: "4个月",
                sex: "2",
                father: "未知鼠",
                mather: "未知鼠",
                time: "",
                address: "瓦达刮擦",
                phone: "18940997824",
            },
            formLabelWidth: "120px",
            rules: {
                name: [{ required: true, message: "请输入姓名" }],
                age: [{ required: true, message: "请输入年龄" }],
                sex: [{ required: true, message: "请选择性别" }],
                father: [{ required: false }],
                mather: [{ required: false }],
                time: [{ required: true, message: "请选择时间" }],
                address: [{ required: true, message: "请输入地址" }],
                phone: [{ required: true, message: "请输入联系方式" }],
            },
            type: "add",
            defaultValue: new Date()
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
            getInfoList(params)
                .then((res) => {
                    this.tableData = res.data;
                    this.tableData.forEach((item) => {
                        item.sex === 1
                            ? (item.sex_text = "男")
                            : (item.sex_text = "女");
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
                `此操作将永久删除学生${row.name}的信息, 是否继续?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true,
                }
            )
                .then(() => {
                    deleteInfo(row.id)
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
        editInfoFn(row) {
            this.type = "edit";
            this.dialogFormVisible = true;
            this.form = { ...row };
        },
        onSubmit() {
            this.getData(this.formInline);
        },
        onCancel() {
            this.formInline.name = "";
            this.getData();
        },
        addInfoFn(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.type === "add") {
                        addInfo(this.form)
                            .then(() => {
                                this.getData();
                                this.$message({
                                    type: "success",
                                    message: "新增成功",
                                });
                                this.dialogFormVisible = false;
                            })
                            .catch(() => {
                                this.$message({
                                    type: "error",
                                    message: "新增失败",
                                });
                            });
                    } else {
                        editInfo(this.form)
                            .then(() => {
                                this.getData();
                                this.$message({
                                    type: "success",
                                    message: "修改成功",
                                });
                                this.dialogFormVisible = false;
                            })
                            .catch(() => {
                                this.$message({
                                    type: "error",
                                    message: "修改失败",
                                });
                            });
                    }
                } else {
                    this.$message({
                        type: "error",
                        message: "表单验证失败",
                    });
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.infoList {
    .header {
        display: flex;
        justify-content: space-between;
    }
    .demo-form-inline {
        text-align: left;
        display: flex;
        align-items: center;
        .el-form-item {
            margin-top: 18px;
        }
    }
    .el-pagination {
        text-align: left;
    }
    .el-date-editor {
        width: 100%;
    }
}
</style>
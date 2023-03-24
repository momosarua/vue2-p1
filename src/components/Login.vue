<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix header">
                <span>通用后台管理系统</span>
            </div>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        type="password"
                        v-model="ruleForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')"
                        >登录</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {validatePassword, validateName} from "../utils/validate"
import {setLocalStorage} from "@/utils/localStorage"
import {login} from "@/api/login"
export default {
    data() {
        return {
            ruleForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [{validator: validateName, trigger: "blur"}],
                password: [{validator: validatePassword, trigger: "blur"}]
                // username: [
                //     {
                //         required: true,
                //         message: "请输入用户名",
                //         trigger: "blur",
                //     },
                //     {
                //         min: 2,
                //         max: 11,
                //         message: "长度在 2 到 11 个字符",
                //         trigger: "blur",
                //     },
                // ],
                // password: [
                //     {
                //         required: true,
                //         message: "请输入密码",
                //         trigger: "blur",
                //     },
                //     {
                //         min: 8,
                //         max: 20,
                //         message: "长度在 8 到 20 个字符",
                //         trigger: "blur",
                //     },
                // ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.ruleForm).then(res => {
                        setLocalStorage("token",res.token)
                        setLocalStorage("username",res.username)
                        this.$router.push("/home")
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
          console.log(111)
            this.$refs[formName].resetFields();
        },
    },
};
</script>

<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(../assets/bg.jpg);
    .box-card {
        background: rgba(0,0,0,.2);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        .header {
            color: #fff;
        }
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both;
        }
    }
}
</style>
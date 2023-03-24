<template>
    <div class="home">
        <Header></Header>
        <el-container class="content">
            <Menu></Menu>
            <el-container>
                <el-main>
                    <Breadcrumb></Breadcrumb>
                    <div class="cont">
                        <router-view></router-view>
                    </div>   
                </el-main>
                <el-footer>
                    <Footer></Footer>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from "./common/Header.vue";
import Footer from "./common/Footer.vue";
import Menu from "./common/Menu.vue";
import Breadcrumb from "./common/Breadcrumb.vue"
export default {
    name: "HelloWorld",
    components: {
        Header,
        Footer,
        Menu,
        Breadcrumb
    },
    props: {},
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .content {
    background: #ddd;
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    .el-container {
        background: #fff
    }
    .cont {
        // background: #fff;
    }
  }
}
</style>

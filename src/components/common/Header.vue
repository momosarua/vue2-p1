<template>
  <div class="header">
    <el-header>
      <div class="title">通用管理系统</div>
      <div>{{name}}</div>
    </el-header>
  </div>
</template>

<script>
import { getLocalStorage } from "../../utils/localStorage"
export default {
  data() {
    return {
      name: ""
    }
  },
  created() {
    this.name = getLocalStorage("username")
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.header {
  /deep/.el-header {
    background: #2578b5 !important;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    .title {
      width: 200px;
      font-size: 24px;
    }
  }
}
</style>
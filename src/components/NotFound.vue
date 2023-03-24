<template>
    <div class="not-found">
        <div class="tips">
            <div>没这个页面啊，你打哪来的？</div>
            上<router-link to="/home">首页</router-link>看看
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.not-found {
    height: 100%;
    width: 100%;
    background: url("../assets/not-found.jpg");
    font-size: 40px;
    .tips {
        position: absolute;
        top: 70%;
        left: 40%;
        color: #fff;
    }
    
}
</style>
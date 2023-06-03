<template>
    <div id='box'>
    <img src="../assets/404.svg">
    <slot></slot>
    <el-link href="/">返回首页</el-link>
    </div>
</template>

<script>
</script>

<style scoped>
    #box {
        text-align: center;
    }
    #box img {
        height: 70vh;
        max-width: 100vw;
    }
    #box .el-link {
        font-size: large;
    }
</style>
<script setup>
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
    <el-menu mode="horizontal" :default-active='route.path' router background-color="#545c64" text-color="#fff">
        <!-- <el-text id='logot'>聚合资讯</el-text> -->
        <el-menu-item index="/" id="home">首页
        <!-- <div class='backhome'>回到首页</div> --></el-menu-item>
        <el-menu-item index="/search">搜索</el-menu-item>
        <el-menu-item index="/live">实时快讯</el-menu-item>
        <el-menu-item index="/hot">聚合热榜</el-menu-item>
        <el-menu-item index="/about">测试用</el-menu-item>
    </el-menu>
    <div id='rv'>
    <router-view></router-view></div>
</template>

<style scoped>
    .el-menu--horizontal{
        position: fixed;
        z-index: 100;
        top:0px;
        width: 100vw;
        border: 0;
        height:55px;
    }
    
    #rv{
        padding-top: 55px;
    }
    /* .backhome{
        top:-100px;
        padding: 0 20px 0 20px;
        position: fixed;
        background-color: #545c64;
    }
    #home:hover .backhome{
        top:0px;
    } */
/* header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
} */
</style>

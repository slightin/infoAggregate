<template>
    <el-container>
        <el-aside width="200px">
            <el-menu default-active="0" background-color="#4A525A" text-color="#ffffff">
                <el-menu-item v-for="(value, key, index) in cate" :index="index.toString()" @click="gethot(key)">
                    <i :class="'iconfont icon-' + key"></i>
                    {{ value }}
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <el-scrollbar height="calc(100vh - 75px)">
                <a v-for="item in hotlist" :href="item.link" target="_blank">
                    <el-card class="icard">
                        <el-link>
                            <span class="rank">{{ item.rank }}</span>
                            {{ item.title }}
                        </el-link>
                        <el-text class="ihot">
                            <i class="iconfont icon-fire"></i>
                            {{ changeTwoDecimal(item.hot / 1e4) }} 万热度
                        </el-text>
                    </el-card>
                </a>
                <el-backtop :right="50" :bottom="50" target=".el-scrollbar__wrap"><i class="iconfont icon-backtop"></i></el-backtop>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script setup>
import axios from 'axios';
import { changeTwoDecimal } from '../utils/index.js';

const hotlist = ref([]);
const cate = ref({
    weibo: '微博热搜',
    zhihu: '知乎热榜',
    baidu: '百度热搜',
    sogou: '搜狗热搜'
});
function gethot(src) {
    axios
        .get('/api/hotnews?src=' + src)
        .then(res => {
            hotlist.value = res.data;
        })
        .catch(err => {
            ElMessage.error('oops,出错啦');
            console.log(err);
        });
}
gethot('weibo');
</script>

<style scoped>
.el-aside {
    background-color: #4a525a;
}
.el-menu-item.is-active {
    color: #F4A261;
    border-right: 4px solid var(--el-menu-active-color);
}
.el-menu-item {
    padding-left: 35px !important;
}
.icard {
    margin: 10px;
}
.el-menu {
    border: 0;
}
.icard:hover {
    background-color: #b2dbbf;
    padding-left: 10px;
    /* box-shadow: var(--el-box-shadow-dark); */
    margin-left: 9px;
}
.icard:hover .rank {
    font-weight: bold;
}
.el-main {
    padding: 10px 20px 10px 20px;
}
.fa-brands,
.iconfont {
    padding: 0 10px 0 10px;
}
.ihot {
    float: right;
}
.rank {
    font-size: larger;
}
.rank,
.icon-fire {
    color: #fa7921;
    padding-right: 10px;
}
</style>

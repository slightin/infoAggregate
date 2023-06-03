<template>
    <div class="about">
        <el-button @click="updatenews('hotnews')">更新热搜</el-button>
        <el-button @click="updatenews('livenews')">更新快讯</el-button>
        <el-button @click="updatenews('maininfo')">更新主页</el-button>
        <br />
    </div>
    <el-card class="wordcloud" :body-style="{ height: '100%', width: '100%' }">
        <el-image :src="'/api/wordcloud/hot?t=' + new Date().getTime()"></el-image>
    </el-card>
</template>

<style scoped>
.wordcloud {
    height: 70%;
    width: 60%;
}
deep() img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
/* @media (min-width: 1024px) {
    .about {
        min-height: calc(100vh - 55px);
        display: flex;
        align-items: center;
    }
} */
</style>

<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import qs from 'qs';

// getlivenews();

function updatenews(cate) {
    ElMessage('更新中');
    axios
        .post(
            '/api/update',
            qs.stringify({
                category: cate
            })
        )
        .then(response => {
            ElMessage.success('更新成功');
            console.log(response);
        })
        .catch(err => {
            ElMessage.error('出错啦');
        });
}
</script>

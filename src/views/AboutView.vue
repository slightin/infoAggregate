<template>
    <div class="about">
        <el-button @click="updatenews('hotnews', hottext)">更新热搜</el-button>
        <el-button @click="updatenews('livenews', livetext)">更新快讯</el-button>
        <br />
        <el-card class="wordcloud" :body-style="{ height: '100%', width:'100%'}"><img :src="'/api/wordcloud/hot?t='+new Date().getTime()" /></el-card>
    </div>
</template>

<style scoped>
.about {
    height: calc(100vh - 55px);
}
.wordcloud {
    height: 70%;
    width: 60%;
}
img {
    width:100%;
    height:100%;
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
import { ref } from 'vue';

const hottext = ref('更新热搜');
const livetext = ref('更新快讯');
// getlivenews();

function getlivenews() {
    axios.get('/api/livenews').then(response => {
        console.log(response);
    });
}

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

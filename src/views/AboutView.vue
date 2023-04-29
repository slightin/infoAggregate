<template>
    <div class="about">
        <button @click="updatenews('hotnews', hottext)">更新热搜</button>
        <button @click="updatenews('livenews', livetext)">更新快讯</button>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
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

<template>
    <el-row justify="center" align="middle" style="height:100%;">
        <el-card class="newscard">
            <template #header>
                <h2>{{ news.news_title }}</h2>
                <i class="fa-regular fa-clock"></i>
                {{ news.pub_time }}
            </template>
            {{ news.news_content }}
            <el-link v-if="news.link != ''" :href="news.link" target="_blank" type="primary">
                <i-ep-link/>
                原文链接
            </el-link>
        </el-card>
    </el-row>
</template>

<script setup>
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const news = ref({});
axios
    .get('/api/livenews/' + route.params.id)
    .then(response => {
        news.value = response.data;
    })
    .catch(error => {
        console.log(error);
    });
</script>

<style>
.newscard {
    max-width: 80%;
    margin-top: 100px;
}
.el-card__header {
    text-align: center;
}
</style>

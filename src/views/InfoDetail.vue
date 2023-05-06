<template>
    <el-row justify="center" align="middle" style="height:100%;">
        <el-card class="infocard">
            <template #header>
                <h1>{{ info.title }}</h1>
                <i class="fa-regular fa-clock"></i>
                {{ info.pub_time }}
            </template>
            <div v-html="info.content" id="infobody"></div>
        </el-card>
    </el-row>
</template>

<script setup>
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const info = ref({});
axios
    .get('/api/maininfo/' + route.params.id)
    .then(response => {
        info.value = response.data;
    })
    .catch(error => {
        console.log(error);
    });
</script>

<style scoped>
.infocard {
    max-width: 80%;
    margin-top: 60px;
    margin-bottom: 30px;
}
.el-card__header {
    text-align: center;
}
</style>
<style>
    #infobody p{
        text-indent: 2em;
        font-size: 18px;
    }
    #infobody p:has(img){
        text-align: center;
    }
</style>
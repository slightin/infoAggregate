<template>
    <el-row justify="center" align="middle" style="height:100%;">
        <el-card class="infocard">
            <template #header>
                <h1>{{ info.title }}</h1>
                <i class="iconfont icon-time"></i>
                {{ info.pub_time }}
                <span class="cate">{{ cate }}</span>
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
const cate = ref();
axios
    .get('/api/maininfo/' + route.params.id)
    .then(response => {
        info.value = response.data;
        getcate();
    })
    .catch(error => {
        if (error.response.status == '404') {
            info.value = {
                title: '您访问的资讯不存在',
                pub_time: new Date().toLocaleString()
            };
        }
        console.log(error);
    });
function getcate() {
    axios
        .get('/api/category')
        .then(response => {
            let cates = response.data;
            console.log(cates);
            cate.value = cates[Number(info.value.cate) - 1].name;
        })
        .catch(error => {
            console.log(error);
        });
}
</script>

<style scoped>
.cate {
    /* color: white; */
    padding: 2px 5px 2px 5px;
    border-radius: 5px;
    background-color: #b2dbbf;
}
.infocard {
    max-width: 80%;
    min-width: 50%;
    margin-top: 60px;
    margin-bottom: 30px;
}
.el-card__header {
    text-align: center;
}
</style>
<style>
#infobody {
    padding: 50px;
}
#infobody p {
    text-indent: 2em;
    font-size: 18px;
}
#infobody p:has(img) {
    text-align: center;
}
</style>

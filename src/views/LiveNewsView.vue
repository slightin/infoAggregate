<template>
    <div class='pagebutton'>
        <el-button v-if="newslist.previous" @click="getlivenews(resetapi(newslist.previous))">上一页</el-button>
        <el-button v-if="newslist.next" @click="getlivenews(resetapi(newslist.next))">下一页</el-button>
    </div>
    <el-timeline class="timeline">
        <el-timeline-item v-for="item in newslist.results" :id="'news' + item.id" :timestamp="item.pub_time"
            placement="top">
            <el-card class="newsitem">
                <el-link :href="'/livenews/'+item.id">
                    {{ item.news_title }}
                </el-link>
            </el-card>
        </el-timeline-item>
    </el-timeline>
    <el-backtop :right="50" :bottom="60" />
</template>

<script setup>
import axios from 'axios';
import resetapi from '../utils'

let newslist = ref()
function getlivenews(url) {
    axios.get(url).then(response => {
        newslist.value = response.data
    }).catch(error => { console.log(error) })
}
console.log(newslist)

getlivenews('/api/livenews')
</script>

<style scoped>
.newsitem {
    width: 90%
}

.newsitem:hover {
    background-color: cornsilk;
}

.timeline{
    margin-top: 20px;
    margin-bottom: 40px;
}

.pagebutton{
    background-color: #545c64;
    width:100%;
    padding: 10px;
    padding-left: 40px;
    bottom: 0px;
    position: fixed;
    z-index: 100;
}
</style>
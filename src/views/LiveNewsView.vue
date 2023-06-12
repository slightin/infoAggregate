<template>
    <!-- <div class='pagebutton'>
        <el-button type="primary" round v-if="newslist.previous!=null" @click="getlivenews(resetapi(newslist.previous))">上一页</el-button>
        <el-button type="primary" round v-if="newslist.next!=null" @click="getlivenews(resetapi(newslist.next))">下一页</el-button>
    </div> -->
    <el-timeline class="timeline" v-infinite-scroll='load' infinite-scroll-immediate='false'>
        <el-timeline-item v-for="item in newslist" :id="'news' + item.id" :timestamp="item.pub_time"
            placement="top">
            <el-card class="liveitem">
                <template #header>
                <!-- <el-link :href="'/live/'+item.id"> -->
                    {{ item.news_title }}
                <!-- </el-link> -->
                </template>
                {{ item.news_content }}
                <el-link v-if="item.link != ''" :href="item.link" target="_blank" type="primary">
                    <i-ep-link/>
                    原文链接
                </el-link>
            </el-card>
        </el-timeline-item>
    </el-timeline>
    <el-backtop :right="50" :bottom="70"><i class='iconfont icon-backtop'></i></el-backtop>
</template>

<script setup>
import axios from 'axios';
import {resetapi} from '../utils'

let newslist = ref([])
var nexturl
function getlivenews(url) {
    axios.get(url).then(response => {
        newslist.value = newslist.value.concat(response.data.results);
        nexturl = response.data.next;
    }).catch(error => { console.log(error) })
}

const load=()=>{
    getlivenews(resetapi(nexturl))
}
// console.log(newslist)

getlivenews('/api/livenews')
</script>

<style scoped>
.liveitem{
    width: 90%;
}
.liveitem:hover {
    background-color: #B2DBBF;
    margin-left: 10px;
    box-shadow: var(--el-box-shadow-dark);
    border-color: #B2DBBF;
    border-radius: 10px;
}

.timeline{
    padding-top: 20px;
    margin-bottom: 40px;
    width: 90vw;
    margin-left: 8vw;
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

:deep() .liveitem .el-card__header{
        text-align: unset;
        font-weight: bold;
        font-size: large;
    }
</style>
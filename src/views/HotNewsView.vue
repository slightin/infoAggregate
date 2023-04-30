<template>
    <el-container>
        <el-aside width="200px">
            <el-menu default-active="1" background-color="#4A525A" text-color="#ffffff">
                <el-menu-item index="1" @click="gethot('weibo')"><i class="fa-brands fa-weibo"></i>微博热搜</el-menu-item>
                <el-menu-item index="2" @click="gethot('zhihu')"><i class="iconfont icon-zhihu"></i>知乎热榜</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <el-scrollbar height='calc(100vh - 80px)'>
                <a v-for='item in hotlist' :href='item.link' target="_blank">
                    <el-card class='icard'>
                        <el-link>{{item.rank}} {{item.title}}</el-link>
                        <el-text class='ihot'><i class="iconfont icon-fire"></i>{{changeTwoDecimal(item.hot/1E4)}} 万热度</el-text>
                    </el-card>
                </a>
                <el-backtop :right="50" :bottom="50" target=".el-scrollbar__wrap"/>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script setup>
    import axios from 'axios'
    import {changeTwoDecimal} from '../utils/index.js'
    
    const hotlist = ref([])
    function gethot(src){
        axios.get('/api/hotnews?src='+src).then(res=>{
            hotlist.value=res.data
        }).catch(err=>{
            ElMessage.error('oops,出错啦')
            console.log(err)
        })
    }
    gethot('weibo')
</script>

<style scoped>
    .icard{
        margin: 10px;
    }
    .icard:hover{
        background-color: #B2DBBF;
    }
    .el-main{
        padding: 10px 20px 10px 20px;
    }
    .fa-brands, .iconfont{
        padding: 0 10px 0 10px;
    }
    .ihot{
        float: right;
    }
</style>
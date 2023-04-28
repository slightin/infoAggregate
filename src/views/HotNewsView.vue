<template>
    <el-container>
        <el-aside width="200px">
            <el-menu default-active="1">
                <el-menu-item index="1" @click="gethot('weibo')">微博热搜</el-menu-item>
                <el-menu-item index="2" @click="gethot('zhihu')">知乎热榜</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <el-scrollbar height='calc(100vh - 98.4px)'>
                <el-card v-for='item in hotlist'>{{item.title}}</el-card>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<script setup>
    import axios from 'axios'
    
    const hotlist = ref([])
    function gethot(src){
        axios.get('/api/hotnews?src='+src).then(res=>{
            hotlist.value=res.data
        }).catch(err=>{
            ElMessage.error('oops,出错啦')
            console.log('err')
        })
    }
    console.log(window.innerHeight)
    gethot('weibo')
</script>

<style>
</style>
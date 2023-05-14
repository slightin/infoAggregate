<template>
    <!-- <el-carousel height="150px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="">{{ item }}</h3>
          </el-carousel-item>
    </el-carousel> -->
    <el-tabs @tab-change="tabclick" tab-position="left" model-value="">
        <el-tab-pane label="全部" name=""/>
        <el-tab-pane v-for="item in cate" :label="item.name" :name="'?cate=' + item.id"/>
    </el-tabs>
    <el-row class = 'sbar' justify="center">
    <el-input placeholder="搜索资讯" @click="toserach" @blur="toserach">
        <template #prepend><i-ep-Search/></template>
    </el-input>
    </el-row>
    <div v-infinite-scroll='load' infinite-scroll-immediate='false'>
        <el-row v-for="item in infolist" justify="center">
            <el-card :body-style="{ display: 'flex' }">
                <el-image :src="item.imageurl" class="infoimg">
                    <template #error>
                        <div class="errbox">
                        <img src="../assets/404.svg">
                        </div>
                    </template>
                </el-image>
                <div class="infodiv">
                    <el-text>
                        <el-link :href="'/info/' + item.id">{{ item.title }}</el-link>
                        <br />
                        <i class="fa-regular fa-clock" />
                        {{ item.pub_time }}
                    </el-text>
                </div>
            </el-card>
        </el-row>
    </div>
    <el-backtop :right="50" :bottom="70"><i class="iconfont icon-backtop"></i></el-backtop>
</template>

<script setup>
import axios from 'axios';
import { resetapi } from '../utils';
import { useRouter } from 'vue-router';
const router = useRouter();

let infolist = ref([]);
const cate = ref([])
var next
function getcate(){
    axios
        .get('/api/category')
        .then(response => {
            cate.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

function gethomeinfo(url) {
    axios
        .get(url)
        .then(response => {
            infolist.value = infolist.value.concat(response.data.results);
            next = response.data.next;
        })
        .catch(error => {
            console.log(error);
        });
}
const toserach=()=>{
    router.push('/search')
}

const tabclick = (name)=>{
    infolist.value = [];
    gethomeinfo('/api/maininfo' + name)
}

const load=()=>{
    console.log(infolist.value)
    gethomeinfo(resetapi(next))
}
getcate()
gethomeinfo('/api/maininfo');
</script>

<style scoped>
.el-tabs {
    position: fixed;
    z-index: 100;
}    

.el-card:hover {
    box-shadow: var(--el-box-shadow-dark);
    padding-right: 10px;
    background-color: #B2DBBF;
    border: #B2DBBF;
}

.el-input{
    width: 50vw;
}

.infodiv {
    display: flex;
    padding-left: 20px;
    width: calc(70vw - 140px);
}
.infodiv .el-link {
    font-size: x-large;
    color: black;
}
.el-row {
    margin: 10px;
}
.fa-clock {
    padding-right: 10px;
}
.errbox {
    width: 144px;
    height: 88px;
    position: unset;
}
</style>

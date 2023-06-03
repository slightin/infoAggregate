<template>
    <el-row justify="center">
        <el-carousel height="150px" type="card">
            <el-carousel-item v-for="item in carousel" :style="'background-image: url(' + item.iurl + ')'" class="caritem">
                <el-link class="cartext" :href="'/info/' + item.id">{{ item.title }}</el-link>
            </el-carousel-item>
        </el-carousel>
    </el-row>
    <el-tabs @tab-change="tabclick" tab-position="left" model-value="">
        <el-tab-pane label="全部" name="" />
        <el-tab-pane v-for="item in cate" :label="item.name" :name="'?cate=' + item.id" />
    </el-tabs>
    <el-row class="sbar" justify="center">
        <el-input placeholder="搜索资讯" @click="toserach" @focus="toserach">
            <template #prepend>
                <i-ep-Search />
            </template>
        </el-input>
    </el-row>
    <div v-infinite-scroll="load" infinite-scroll-immediate="false">
        <el-row v-for="item in infolist" justify="center">
            <el-card :body-style="{ display: 'flex' }">
                <el-image :src="item.imageurl" class="infoimg">
                    <template #error>
                        <div class="errimg"><img src="../assets/404.svg" /></div>
                    </template>
                </el-image>
                <div class="infodiv">
                    <el-text>
                        <el-link :href="'/info/' + item.id">{{ item.title }}</el-link>
                        <br />
                        <i class="iconfont icon-time" />
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
import { ElMessage } from 'element-plus';
const router = useRouter();

let infolist = ref([]);
const cate = ref([]);
var next;
const carousel = ref([]);

const get_carousel = () => {
    axios
        .get('/api/get/carousel')
        .then(response => {
            carousel.value = response.data;
        })
        .catch(err => {
            ElMessage('oops~ 出错了');
            console.log(err);
        });
};

function getcate() {
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
const toserach = () => {
    router.push('/search');
};

const tabclick = name => {
    infolist.value = [];
    gethomeinfo('/api/maininfo' + name);
};

const load = () => {
    console.log(infolist.value);
    gethomeinfo(resetapi(next));
};
get_carousel();
getcate();
gethomeinfo('/api/maininfo');
</script>

<style scoped>
.caritem {
    border-radius: 15px;
    background-size: cover;
    border: solid #9CAFB7 0.5px;
}
.caritem.is-active{
    box-shadow: var(--el-box-shadow-light);
}
.cartext {
    padding: 0 10px 0 10px;
    position: absolute;
    bottom: 0;
    background-color: rgba(255,255,255,0.7);
    color: black;
    font-size: large;
    width: 100%;
}
.el-tabs {
    position: fixed;
    z-index: 100;
}

.el-card:hover {
    box-shadow: var(--el-box-shadow-dark);
    padding-right: 15px;
    background-color: #b2dbbf;
    border: #b2dbbf;
}

.el-input {
    width: 50vw;
}
.el-carousel {
    width: 60vw;
    /* min-width: 100px; */
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
.icon-time {
    padding-right: 5px;
}
.errimg {
    width: 144px;
    height: 88px;
    position: unset;
}
</style>

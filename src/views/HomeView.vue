<template>
    <!-- <el-row v-for="item in infolist.results" justify="center">
        <el-card>
            <el-col>
                <img :src="item.imageurl" />
                <el-link :href="'/info/'+item.id">{{ item.title }}</el-link>
            </el-col>
        </el-card>
    </el-row> -->
    <el-row v-for="item in infolist.results" justify="center">
        <el-card :body-style="{display: 'flex'}">
            <img :src="item.imageurl" class="infoimg" />
            <div class="infodiv">
                <el-text>
                <el-link :href="'/info/' + item.id">{{ item.title }}</el-link><br/><i class="fa-regular fa-clock"/>{{item.pub_time}}
                </el-text>
            </div>
        </el-card>
    </el-row>
    <el-backtop :right="50" :bottom="70"><i class='iconfont icon-backtop'></i></el-backtop>
</template>

<script setup>
import axios from 'axios';
import { resetapi } from '../utils';

let infolist = ref({});
function gethomeinfo(url) {
    axios
        .get(url)
        .then(response => {
            infolist.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

gethomeinfo('/api/maininfo');
</script>

<style scoped>
    .el-card:hover {
        box-shadow: var(--el-box-shadow-dark);
        padding: 5px;
        /* background-color: #B2DBBF; */
    }
.infodiv {
    display: flex;
    padding-left: 20px;
    width: calc(70vw - 140px);
}
.infodiv .el-link{
    font-size: x-large;
}
.el-row {
    margin: 10px;
}
.fa-clock{
    padding-right: 10px;
}
</style>

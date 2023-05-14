<template>
    <el-row class = 'sbar' justify="center">
    <el-input placeholder="搜索资讯" @change="dosearch" v-model="search" focus="">
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
</template>

<script setup>
import {resetapi} from "../utils";
import axios from 'axios';
import { onMounted } from "vue";

onMounted(()=>{
    // console.log(document.querySelector(".el-input__inner").focus())
})

const search = ref("")
let infolist = ref([])
let next

const dosearch = () =>{
    infolist.value=[]
    gethomeinfo('/api/maininfo?title='+search.value)
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
const load=()=>{
    console.log(infolist.value)
    gethomeinfo(resetapi(next))
}
</script>

<style scoped>
    .el-row {
        margin: 10px;
    }
    .el-card:hover {
        box-shadow: var(--el-box-shadow-dark);
        padding-right: 10px;
        background-color: #FFFFFA;
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
    }

    .fa-clock {
        padding-right: 10px;
    }
</style>
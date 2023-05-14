<template>
    <el-row class = 'sbar' justify="center">
    <el-input placeholder="搜索资讯" v-model="search" @input="dosearch" clearable focus="">
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
    if (search.value!=="") word_highlight()
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

function word_highlight(){
    const Reg = new RegExp('(?<!>)'+search.value, 'ig');
    setTimeout(()=>{
        let list = document.querySelectorAll(".el-link__inner");
        list.forEach(item=>{
            // console.log(item.innerHTML)
            item.innerHTML=item.innerHTML.replace(Reg, `<font class="highlight">$&</font>`);
            // res = val.replace(Reg, `<span style="background-color: yellow;">$&</span>`);
        })
    },100)
}
const load=()=>{
    console.log(infolist.value)
    gethomeinfo(resetapi(next))
    if (search.value!=="") word_highlight()
}
</script>

<style scoped>
    .el-row {
        margin: 10px;
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
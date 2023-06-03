<template>
    <el-row class="sbar" justify="center" :gutter="10">
        <el-col :span="12">
            <el-input placeholder="搜索资讯" v-model="search" @input="dosearch" clearable 
            :formatter="(value)=>value"
            maxlength="30"
            show-word-limit
            :parser="(value)=>value.replace(/[^\w\u4E00-\u9FA5]/g,'')">
                <template #prepend>
                    <i-ep-Search />
                </template>
            </el-input>
        </el-col>
        <el-col :span="6">
            <el-config-provider :locale="locale">
            <el-date-picker
                class="datepicker"
                v-model="pubdate"
                type="daterange"
                :editable="false"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="截止日期"
                :default-value="new Date(new Date().setMonth(new Date().getMonth() - 1))"
                @change="dosearch"
                unlink-panels
                :shortcuts="shortcuts"
                value-format="YYYY-MM-DD"
            />
            </el-config-provider>
        </el-col>
    </el-row>
    <div v-infinite-scroll="load" infinite-scroll-immediate="false">
        <el-row v-for="item in infolist" justify="center">
            <el-card :body-style="{ display: 'flex' }">
                <el-image :src="item.imageurl" class="infoimg">
                    <template #error>
                        <div class="errbox"><img src="../assets/404.svg" /></div>
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
import { resetapi } from '../utils';
import axios from 'axios';
import { onMounted } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'


onMounted(() => {
    // console.log(document.querySelector(".el-input__inner").focus())
});

const locale = ref(zhCn)
const search = ref('');
let infolist = ref([]);
let next;
const pubdate = ref(null);
const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 7);
            return [start, end];
        }
    },
    {
        text: '最近15天',
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 15);
            return [start, end];
        }
    },
    {
        text: '一个月内',
        value: () => {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 30);
            return [start, end];
        }
    },
    {
        text: '一个月前',
        value: () => {
            const end = new Date();
            const start = new Date(0);
            end.setDate(end.getDate() - 30);
            return [start, end];
        }
    }
];

const dosearch = () => {
    infolist.value = [];
    let url = '/api/maininfo?title=' + search.value;
    console.log(search.value)
    if (pubdate.value!=null) 
        url += '&pub_gt=' + pubdate.value[0] + ' 00:00' + '&pub_lt=' + pubdate.value[1] + ' 23:59'
    gethomeinfo(url);
    if (search.value !== '') word_highlight();
};

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

function word_highlight() {
    const Reg = new RegExp('(?<!>)' + search.value, 'ig');
    setTimeout(() => {
        let list = document.querySelectorAll('.el-link__inner');
        list.forEach(item => {
            // console.log(item.innerHTML)
            item.innerHTML = item.innerHTML.replace(Reg, `<font class="highlight">$&</font>`);
            // res = val.replace(Reg, `<span style="background-color: yellow;">$&</span>`);
        });
    }, 100);
}
const load = () => {
    console.log(infolist.value);
    gethomeinfo(resetapi(next));
    if (search.value !== '') word_highlight();
};
</script>

<style scoped>
:deep() .datepicker {
    width: 100% !important;
}
.el-row {
    padding: 10px;
    margin: 0 !important;
}
.el-card:hover {
    box-shadow: var(--el-box-shadow-dark);
    padding-right: 10px;
    background-color: #b2dbbf;
    border: #b2dbbf;
}

/* .el-input{
        width: 50vw;
    } */

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

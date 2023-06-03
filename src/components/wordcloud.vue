<template>
    <el-card class="wordcloud" :body-style="{ height: '100%', width: '100%'}">
        <el-image 
            :src='url'
            :preview-src-list='[url]'
        >
            <template #error>
                <div class="errimg"><img src="../assets/404.svg" /></div>
            </template>
        </el-image>
        <div class="slot"><slot></slot></div>
    </el-card>
</template>

<script setup>
    const props = defineProps(['cloud'])
    const url = ref('/api/wordcloud/'+props.cloud+'?t=' + new Date().getTime())
</script>

<style scoped>
.wordcloud {
    width: 390px;
    display: flex;
    margin: 20px;
}

.wordcloud:hover {
    box-shadow: var(--el-box-shadow-dark);
}

:deep().el-card__body{
    padding:0 0 10px 0;
    font-size: large;
}

.slot {
    margin-top: -30px;
    text-align: center;
}

:deep() img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

:deep() .el-image__wrapper{
    position: unset;
}

.errimg {
    width: 390px;
    height: 260px;
    position: unset;
}
</style>
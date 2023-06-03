<template>
    <div class='clouddiv'>
    <wordcloud v-for='item in clouds' :cloud='item.iname'>{{item.text}}</wordcloud>
    </div>
</template>

<script setup>
    import wordcloud from "../components/wordcloud.vue"
    import axios from 'axios'
    
    
    class clouddata {
        constructor(iname,text){
            this.iname=iname;
            this.text=text;
        }
    }
    
    const clouds = ref([
        new clouddata('hot','热搜词云图'),
        new clouddata('info','最近热词'),
        new clouddata('live','快讯热词')
    ])
    axios
        .get('/api/category')
        .then(response => {
            console.log(response.data)
            for (let cate of response.data){
                console.log(cate.id)
                clouds.value.push(new clouddata('info_'+cate.id,cate.name + '热词'))
            }
        })
        .catch(error => {
            console.log(error);
        });
</script>

<style scoped>
    .clouddiv{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
/*    .wordcloud {
        width: 300px;
    } */
</style>
<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button @click="updatelivenews">{{ bttext }}</button>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>

<script setup>
import axios from 'axios';
import qs from 'qs';
import { ref } from 'vue';

const bttext = ref('现在更新');
getlivenews();

function getlivenews() {
    axios.get('/api/get/livenews').then(response => {
        console.log(response);
    });
}

function updatelivenews() {
    bttext.value = '更新中';
    axios
        .post(
            '/api/update',
            qs.stringify({
                category: 'livenews'
            })
        )
        .then(response => {
            bttext.value = '更新完成';
            console.log(response);
        });
}
</script>

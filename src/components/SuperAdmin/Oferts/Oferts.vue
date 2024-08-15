<script setup>
import manyImages from '../Reutilizables/Inputs/manyImages.vue';
import { ref } from 'vue';

const images = ref([]);

const handleEmit = (img) => {
    images.value.push(img);
};

const handleDeleteImage = (index) => {
    images.value.splice(index, 1);
};
</script>

<template>
    <div>
        <h1>Oferts</h1>
        <manyImages :images="images" @handleEmit="handleEmit" @handleDeleteImage="handleDeleteImage"/>
    </div>
</template>
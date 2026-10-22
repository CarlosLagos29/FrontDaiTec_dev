<script setup lang="ts">
import manyImages from "../Reutilizables/Inputs/manyImages.vue";
import { ref } from "vue";

const images = ref<string[]>([]);

const handleEmit = (img: string) => {
    images.value.push(img);
};

const handleDeleteImage = (index: number) => {
    images.value.splice(index, 1);
};
</script>

<template>
    <div>
        <h1>Oferts</h1>
        <manyImages
            :images="images"
            @handle-emit="handleEmit"
            @handle-delete-image="handleDeleteImage"
        />
    </div>
</template>

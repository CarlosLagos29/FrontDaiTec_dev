<script setup>
import { ref } from 'vue';
import { BASE_URL } from '@/GlobalState/store';
import { message } from 'ant-design-vue';

import uniqueImage from '../Reutilizables/Inputs/uniqueImage.vue';

const newPromo = ref({
    name: "",
    url: "",
});

const emit = defineEmits(['handleCreate']);

const handleCreateImg =( img )=> {
    newPromo.value.url = img;
    console.log(newPromo.value);
};
</script>

<template>
    <form class=" mt-4">
        <label>Nombre: </label>
        <input class="border border-slate-400 px-2 py-1 rounded-md placeholder:italic" placeholder="ejemplo: promo 1"
            type="text" name="nameModel" v-model="newPromo.name">
            <!-- <a-alert class=" rounded-md py-1 text-red-600 " v-if="errors.name" type="error" :message="errors.name" banner /> -->
        <label>Imagen promocional: </label>
        <uniqueImage :url="newPromo.url" @handleCreateImg="handleCreateImg" @handleDeleteImg="() => newPromo.url = ''"/>
    </form>
</template>
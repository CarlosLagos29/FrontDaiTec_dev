<script setup>
import { EditOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex';
import { h } from 'vue';

const { dispatch } = useStore();

const props = defineProps({
    id: String,
    type: String,
})

const handleClick = () => {
    dispatch('getEdit', { type: props.type, id: props.id });
}; 
</script>

<template>
    <a-button class=" full-width-button bg-yellow-400 flex justify-center items-center" type="primary" @click="handleClick"
        :icon="h(EditOutlined)" />
</template>

<style scoped>
.full-width-button {
    width: 100%;
    height: 120%;
}
</style>
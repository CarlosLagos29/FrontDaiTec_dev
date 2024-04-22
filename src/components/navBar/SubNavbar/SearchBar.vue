<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const name = ref("");

const search = async () => {
    try {
        await store.dispatch('getName', name.value)
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <nav class=" flex gap-1">
        <input class="border px-2 border-slate-400 rounded-full" type="text" v-model="name" @keydown.enter="search">
        <button class="border px-2 border-slate-400 rounded-full flex items-center" @click="search">
            <span class="material-symbols-outlined">
                search
            </span></button>
    </nav>
</template>
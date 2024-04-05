<script setup>
import AdminView from '../Reutilizables/AdminView.vue';
import CreateGeneral from './CreateGeneral.vue'
import { ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const create = ref(false);

const handlercreate = () => {
    create.value = !create.value
};
</script>

<template>
    <div>
        <button class=" border border-slate-400 rounded-2xl text-lg px-2" @click="handlercreate">
            <span v-if="!create"> + Añadir producto </span>
            <span v-else> x </span>
        </button>
        <CreateGeneral v-show="create"/>
        <AdminView :route="'products/generals/'" />
    </div>
</template>
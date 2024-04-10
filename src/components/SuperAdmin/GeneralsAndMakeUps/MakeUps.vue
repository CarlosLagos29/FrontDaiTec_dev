<script setup>
import AdminView from '../Reutilizables/AdminView.vue';
import Create from './Create.vue';
import Edit from './Edit.vue';

import { useStore } from 'vuex';
import { ref } from "vue";
import { BASE_URL } from '@/GlobalState/store';


const store = useStore();
const create = ref(false);
const currentSource = 'makeups'

const handlercreate = () => {
    create.value = !create.value
}

</script>

<template>
    <div>
        <button v-if="store.state.edit?.source !== currentSource"
            class=" border border-slate-400 rounded-2xl text-lg px-2" @click="handlercreate">
            <span v-if="!create"> + Añadir producto </span>
            <span v-else> x </span>
        </button>
        <Edit v-if="store.state.edit?.source && store.state.edit?.source === currentSource"
            :currentSource="currentSource" :path="`${BASE_URL}products/makeups/`" />
        <Create v-show="create" :path="`${BASE_URL}products/makeups/`" />
        <AdminView :route="'products/makeups/'" />
    </div>
</template>
<script setup>
import AdminView from '../Reutilizables/AdminView.vue';
import Create from './Create.vue';

import { useStore } from 'vuex';
import { ref } from "vue";
import { BASE_URL } from '@/GlobalState/store';


const store = useStore();
const create = ref(false);

const handlercreate = () =>{
    create.value = !create.value
}

</script>

<template>
    <div>
        <button class=" border border-slate-400 rounded-2xl text-lg px-2" @click="handlercreate">
            <span v-if="!create"> + Añadir producto </span> 
            <span v-else> x </span>
         </button>
         <Create v-show="create" :path="`${BASE_URL}products/makeups/`"/>
        <AdminView :route="'products/makeups/'"/>
    </div>
</template>
<script setup>
import AdminView from '../Reutilizables/AdminView.vue';
import { useStore } from 'vuex';
import { ref } from "vue";


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
        <h1 v-if=" store.state.edit?.source && store.state.edit?.source === 'makeups'">estoy editando</h1>
        <AdminView :route="'products/makeups/'"/>
    </div>
</template>
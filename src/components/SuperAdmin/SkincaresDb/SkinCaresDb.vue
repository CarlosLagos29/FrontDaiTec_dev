<script setup>
    import AdminView from "../Reutilizables/AdminView.vue";
    import CreateSkincare from "./CreateSkincare.vue"
    import { ref } from "vue";
    import { useStore } from 'vuex';

    const create = ref(false);

    const store = useStore();
    const test = ()=>{
        store.dispatch('changeIsediting')
    }
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
        <h1>{{ store.state.isEditing }}</h1>
        <button @click="test">click</button>
        <CreateSkincare v-show="create"/>
        <AdminView :route="'products/skincares/'" />
    </div>
</template>
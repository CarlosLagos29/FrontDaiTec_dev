<script setup>
import AdminView from "../Reutilizables/AdminView.vue";
import CreateSkincare from "./CreateSkincare.vue"
import { ref } from "vue";
import { useStore } from 'vuex';
import EditSkincare from "./EditSkincare.vue"

const store = useStore()
const create = ref(false);
const currentSource = 'skincares'

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
        <EditSkincare v-if="store.state.edit?.source && store.state.edit?.source === 'skincares'" />
        <CreateSkincare v-show="create" />
        <AdminView :route="'products/skincares/'" />
    </div>
</template>
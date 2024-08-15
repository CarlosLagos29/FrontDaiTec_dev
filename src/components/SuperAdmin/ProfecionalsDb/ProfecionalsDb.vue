<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

import viewProfecional from './viewProfecional.vue';
import formProfecional from './formProfecional.vue';

const addProfecional = ref(false);
const { state } = useStore();

const createProfecional = formProfecional;
const editProfecional = formProfecional;

</script>

<template>
    <div>
        <button class=" my-3 " @click="addProfecional = !addProfecional">
            <span v-if="!addProfecional && !state.edit.hasOwnProperty('services')" class=" border rounded-md px-4 py-2"> + Añadir profecional</span>
        </button>
        <viewProfecional v-if="!addProfecional && !state.edit.hasOwnProperty('services')" />
        <createProfecional v-if="addProfecional" @handleCreate="addProfecional = !addProfecional" />
        <editProfecional v-if="state.edit.services" :profecional="state.edit"/>
    </div>
</template>
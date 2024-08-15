<script setup>
import { ref } from 'vue';

import viewProfecional from './viewProfecional.vue';
import formProfecional from './formProfecional.vue';

const addProfecional = ref(false);

const createProfecional = formProfecional;
const editProfecional = formProfecional;

</script>

<template>
    <div>
        <button class=" my-3 "  @click="addProfecional = !addProfecional">
                <span v-if="!addProfecional" class=" border rounded-md px-4 py-2"> + Añadir profecional</span>
        </button>
        <viewProfecional v-if="!addProfecional"/>
        <createProfecional v-else @handleCreate="addProfecional = !addProfecional"/>
    </div>
</template>
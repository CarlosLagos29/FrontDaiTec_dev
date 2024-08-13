<script setup>
import { ref } from 'vue';

import viewProfecional from './viewProfecional.vue';
import createProfecional from './createProfecional.vue';

const addProfecional = ref(false);

</script>

<template>
    <div>
        <button  @click="addProfecional = !addProfecional">
                <span v-if="!addProfecional" class=" border rounded-md px-4 py-2 text-buttons"> + Añadir promo</span>
        </button>
        <viewProfecional v-if="!addProfecional"/>
        <createProfecional v-else @handleCreate="addProfecional = !addProfecional"/>
    </div>
</template>
<script setup>
import { ref } from 'vue';

import viewPromos from "./viewPromos.vue";
import createPromos from "./createPromos.vue";

const addPromo = ref(false);
</script>

<template>
        <div>
            <button  @click="addPromo = !addPromo">
                <span v-if="!addPromo" class=" border border-titulos rounded-md px-4 py-2 text-buttons"> + Añadir promo</span>
            </button>
        <createPromos v-if="addPromo" @handleCreate="addPromo = !addPromo" />
        <viewPromos/>
    </div>

</template>
<script setup>
import { ref } from 'vue';

import viewPromos from "./ViewPromos.vue";
import createPromos from "./CreatePromos.vue";

const addPromo = ref(false);
</script>

<template>
        <div>
            <button  @click="addPromo = !addPromo">
                <span v-if="!addPromo" class=" border rounded-md px-4 py-2 text-buttons"> + Añadir promo</span>
            </button>
        <createPromos v-if="addPromo" @handleCreate="addPromo = !addPromo" />
        <viewPromos/>
    </div>
</template>
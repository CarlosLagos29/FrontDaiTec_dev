<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import type { Promo } from "@/types";

import cardPromos from "./CardPromos.vue";

const { dispatch, state } = useStore();

// Vuex no tipa el state: se tipa acá hasta migrar a Pinia
const promos = computed<Promo[]>(() => state.promos);

onMounted(() => {
    dispatch("getPromos");
});
</script>

<template>
    <div>
        <cardPromos v-for="(promo, index) in promos" :key="index" :promo="promo" :order="index" />
    </div>
</template>

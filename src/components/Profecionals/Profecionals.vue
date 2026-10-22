<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import type { Profecional } from "@/types";
import ProfecionalsCard from "./ProfecionalsCard.vue";

const store = useStore();

// Vuex no tipa el state: se tipa acá hasta migrar a Pinia
const profecionals = computed<Profecional[]>(() => store.state.profecionals);

onMounted(async () => {
    try {
        await store.dispatch("getProfecionals");
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <div class="flex flex-col gap-y-2 justify-center items-center">
        <ProfecionalsCard
            v-for="(profecional, index) in profecionals"
            :key="index"
            :profecional="profecional"
            :order="index"
        />
    </div>
</template>

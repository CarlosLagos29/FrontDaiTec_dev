<script setup>
    import { onMounted } from "vue";
    import { useStore } from "vuex";
    import ProfecionalsCard from "./ProfecionalsCard.vue";

    const store = useStore();

    onMounted(
        async () =>{
            try {
                await store.dispatch('getProfecionals')
            } catch (error) {
                console.error(error);
            }
        }
    )
    
</script>

<template>
    <div class=" flex flex-col gap-y-2 justify-center items-center">
        <ProfecionalsCard v-for="(profecional, index) in store.state.profecionals" :key="index" :profecional="profecional" :order="index"/>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { onMounted } from 'vue';

import cardProfecional from './cardProfecional.vue';

const { dispatch, state} = useStore();

onMounted(()=>{
    dispatch('getProfecionals');
})
</script>

<template>
    <div>
        <cardProfecional v-for="(profecional) in state.profecionals" :key="profecional._id" :profecional="profecional"/>
    </div>
</template>
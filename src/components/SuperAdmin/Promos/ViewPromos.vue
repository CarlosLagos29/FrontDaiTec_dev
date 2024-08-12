<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import cardPromos from './cardPromos.vue';

const { dispatch, state } = useStore();


onMounted(() => {
  dispatch('getPromos');
}
);

</script>

<template>
    <div>
        <cardPromos v-for="(promo, index) in state.promos" :key="index" :promo="promo" :order="index"/>
    </div>
</template>
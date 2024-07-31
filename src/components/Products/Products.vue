<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import subNavbar from '../navBar/SubNavbar/subNavbar.vue';

import ProductCard from '../Products/ProductCard.vue'

const { dispatch, state} = useStore();

onMounted(
    async () => {
        try {
            await dispatch('getAllProducts');
        } catch (error) {
            console.error(error)
        }
    }
);
</script>

<template>
    <nav>
        <subNavbar/>
    </nav>
    <div class=" flex flex-wrap justify-center ">
        <ProductCard v-for="(product, index) in state.allProducts" :key="index" :product="product" />
    </div>
</template>
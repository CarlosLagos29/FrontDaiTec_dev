<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import subNavbar from '../navBar/SubNavbar/subNavbar.vue';

import ProductCard from '../Products/ProductCard.vue'

const store = useStore();

onMounted(
    async () => {
        try {
            await store.dispatch('getAllProducts');
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
        <ProductCard v-for="(product, index) in store.state.allProducts" :key="index" :product="product" />
    </div>
</template>
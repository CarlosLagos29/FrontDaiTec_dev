<script setup>
        import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
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
    <div>
        <ProductCard v-for="(product, index) in store.state.allProducts" :key="index" :product="product"/>
    </div>
</template>
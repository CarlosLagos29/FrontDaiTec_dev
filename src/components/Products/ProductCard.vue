<script setup>
const props = defineProps({
    product: Object
})
</script>

<template>
    <div class=" border-indigo-500 border-4 m-4 flex flex-col">
        <section>
            <img :src="product.img[0]" :alt="product.name">
        </section>
        <section>            
            <h1 class=" text-xl font-bold">{{ product.name }}</h1>
            <h1 class=" text-xl font-bold">Precio: {{ product.price }}</h1>
        </section>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    product: Object
})


const currentColor = ref("")

const selectcolor = (color) => {
    currentColor.value = color
}


</script>

<template>
    <div class=" border-pink-300 rounded-lg border-4 m-4
     flex flex-col justify-center
     p-3 hover:scale-105 transition-transform">
        <RouterLink :to="`/productos/${product.source}/${product._id}`">
            <section>
                <img class=" size-64 rounded-lg " :src="product.img[0]" :alt="product.name">
            </section>
        </RouterLink>
        <section>
            <h1 class=" text-xl font-bold">{{ product.name }}</h1>

            <h1 class="text-xl font-bold">
                Precio:
                <span v-if="product.discount > 0">
                    <del class=" text-slate-300">${{ product.price }}</del>
                </span>
                <span v-if="product.discount > 0" class=" ml-0.5 text-green-300">
                    ${{ (product.price - (product.price * (product.discount / 100))).toFixed(2) }}
                </span>
                <span v-else>
                    ${{ product.price }}
                </span>
            </h1>

            <h1 class=" text-xl font-bold" v-if="product.crema">Tipo de crema: {{ product.crema }}</h1>
            <h1 class=" text-xl font-bold" v-if="product.skinType">Tipo de piel: {{ product.skinType }}</h1>

            <div v-if="product.colors && product.colors.length" class="flex flex-col gap-1">
                <h1 class=" text-xl font-bold">Colores disponibles: </h1>
                <ul class=" flex gap-1 flex-wrap">
                    <li v-for="(color, index) in product.colors" :key="index">
                        <button @click="selectcolor(color.name)"
                            class="rounded-full border-2 border-pink-300  p-0.5 disabled:border-gray-400 disabled:opacity-55"
                            :class="{ 'bg-cyan-300': currentColor === color.name }" :disabled="color.availity == 0">
                            <span class="block size-4 rounded-full" :style="{ backgroundColor: color.name }"></span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="flex mt-2">
                <button class=" border-2 bg-pink-300 px-2 rounded-full disabled:text-gray-400"
                    :disabled="product.available === 0">
                    Agregar
                </button>
                <h1 v-if="product.available === 0" class=" text-red-500">No disponible</h1>
            </div>
        </section>
    </div>
</template>
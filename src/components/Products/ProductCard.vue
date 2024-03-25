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
    <div class=" border-pink-300 rounded-lg border-4 m-4 flex flex-col p-3">
        <RouterLink :to="`/productos/${product.source}/${product._id}`">
            <section>
                <img class=" size-64 rounded-lg " :src="product.img[0]" :alt="product.name">
            </section>
        </RouterLink>
        <section>
            <h1 class=" text-xl font-bold">{{ product.name }}</h1>

            <h1 class="text-xl font-bold">
                Precio:
                <span v-if="product.discount && product.discount.percent">
                    <del class=" text-slate-300">${{ product.price }}</del>
                </span>
                <span v-if="product.discount && product.discount.percent" class=" ml-0.5 text-green-300">
                    ${{ (product.price - (product.price * (product.discount.percent / 100))).toFixed(2) }}
                </span>
                <span v-else>
                    ${{ product.price }}
                </span>
            </h1>

            <h1 class=" text-xl font-bold" v-if="product.crema">Tipo de crema: {{ product.crema  }}</h1>
            <h1 class=" text-xl font-bold" v-if="product.skinType">Tipo de piel: {{ product.skinType  }}</h1>

            <div v-if="product.colors" class="flex flex-col gap-1">
                <h1 class=" text-xl font-bold">Colores disponibles: </h1>
                <ul class=" flex gap-1 flex-wrap">
                    <li v-for="(color, index) in product.colors" :key="index">
                        <button @click="selectcolor(color)" class="rounded-full border-2 p-0.5"
                            :class="{ 'bg-cyan-300': currentColor === color }">
                            <span class="block size-4 rounded-full border-2 border-slate"
                                :style="{ backgroundColor: color }"></span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="flex gap-2 mt-1 items-center">
                <button class=" border-2 bg-pink-300 px-2 rounded-full" 
                :class="{ 'disabled text-gray-400': product.available === 0 }">
                    Agregar
                </button>
                <h1 v-if=" product.available === 0 " class=" text-red-500">No disponible</h1>
            </div >
        </section>
    </div>
</template>
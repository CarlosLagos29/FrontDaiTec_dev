<script setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

const props = defineProps({
    product: Object,
    path: String,
})

const fullpath = `${props.path}${props.product._id}`;
const store = useStore()

const deleteCard = async () => {
    try {
        await axios.delete(fullpath);
        await store.dispatch('getAdminview', props.path)
    } catch (error) {
        console.error(error)
    }
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
                <span v-if="product.discount != 0">
                    <del class=" text-slate-300">${{ product.price }}</del>
                </span>
                <span v-if="product.discount != 0" class=" ml-0.5 text-green-300">
                    ${{ (product.price - (product.price * (product.discount / 100))).toFixed(2) }}
                </span>
                <span v-else>
                    ${{ product.price }}
                </span>
            </h1>

            <h1 class=" text-xl font-bold" v-if="product.crema">Tipo de crema: {{ product.crema }}</h1>
            <h1 class=" text-xl font-bold" v-if="product.skinType">Tipo de piel: {{ product.skinType }}</h1>

            <div v-if="product.colors" class="flex flex-col gap-1">
                <h1 class=" text-xl font-bold">Colores disponibles: </h1>
                <ul class=" flex gap-1 flex-wrap">
                    <li v-for="(color, index) in product.colors" :key="index">
                        <button class="rounded-full border-2 p-0.5">
                            <span class="block size-4 rounded-full border-2 border-slate"
                                :style="{ backgroundColor: color }"></span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="flex gap-2 mt-1 items-center justify-center">
                <button class="border-2 bg-green-500 px-2 rounded-full">Editar</button>
                <button class="border-2 bg-red-600 px-2 rounded-full" @click="deleteCard">Eliminar</button>
            </div>
        </section>
    </div>
</template>
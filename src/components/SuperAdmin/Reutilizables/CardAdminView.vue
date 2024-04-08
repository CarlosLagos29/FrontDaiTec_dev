<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

const props = defineProps({
    product: Object,
    path: String,
})

const store = useStore()

const deleteCard = async () => {
    try {
        const fullpath = `${props.path}${props.product._id}`;
        await axios.delete(fullpath);
        await store.dispatch('getAdminview', props.path)
    } catch (error) {
        console.error(error)
    }
}

const editCard = async () => {
    try {
        const fullpath = `${props.path}${props.product._id}`;
        await store.dispatch('getEdit', fullpath);
    } catch (error) {
        console.error(error)
    }
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
            <h1>{{ product._id }}</h1>
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

            <div v-if="product.colors && product.colors.length " class="flex flex-col gap-1">
                <h1 class=" text-xl font-bold">Colores disponibles: </h1>
                <ul class=" flex gap-1 flex-wrap">
                    <li v-for="(color, index) in product.colors" :key="index">
                        <button class="rounded-full border-2 border-pink-300  p-0.5 disabled:border-gray-400 disabled:opacity-55"
                            :disabled="color.availity == 0">
                        <span class="block size-4 rounded-full"   
                                :style="{ backgroundColor: color.name }"></span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="flex gap-2 mt-2 items-center justify-center">
                <button class="border-2 hover:bg-green-400 transition duration-500 px-2 rounded-full" @click="editCard">Editar</button>
                <button class="border-2 hover:bg-red-500 transition duration-500 px-2 rounded-full" @click="deleteCard">Eliminar</button>
            </div>
        </section>
    </div>
</template>
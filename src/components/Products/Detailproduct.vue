<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "@/api/config";
import type { Product } from "@/types";

const route = useRoute();

// null hasta que llega del back
const product = ref<Product | null>(null);
const currentColor = ref("");

const selectcolor = (color: string) => {
    currentColor.value = color;
};

onMounted(async () => {
    try {
        const { data } = await axios.get<Product>(`${BASE_URL}products/${route.params.id}`);
        product.value = data;
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <div v-if="product" class="flex items items-center">
        <section class="size-96 flex items-center">
            <a-carousel autoplay>
                <span v-for="(img, index) in product.img" :key="index">
                    <a-image :src="img" :alt="img" />
                </span>
            </a-carousel>
        </section>

        <section class="flex flex-col justify-center">
            <h1 class="text-xl font-bold">{{ product.name }}</h1>
            <h1>{{ product.description }}</h1>

            <h1 class="text-xl font-bold">
                Precio:
                <span v-if="product.discount != 0">
                    <del class="text-slate-300">${{ product.price }}</del>
                </span>
                <span v-if="product.discount != 0" class="ml-0.5 text-green-300">
                    ${{ (product.price - product.price * (product.discount / 100)).toFixed(2) }}
                </span>
                <span v-else> ${{ product.price }} </span>
            </h1>

            <h1 v-if="product.crema" class="text-xl font-bold">
                Tipo de crema: {{ product.crema }}
            </h1>
            <h1 v-if="product.skinType" class="text-xl font-bold">
                Tipo de piel: {{ product.skinType }}
            </h1>

            <div v-if="product.colors && product.colors.length" class="flex flex-col gap-1">
                <h1 class="text-xl font-bold">Colores disponibles:</h1>
                <ul class="flex gap-1 flex-wrap">
                    <li v-for="(color, index) in product.colors" :key="index">
                        <button
                            class="rounded-full border-2 border-pink-300 p-0.5 disabled:border-gray-400 disabled:opacity-55"
                            :class="{ 'bg-cyan-300': currentColor === color.name }"
                            :disabled="color.availity == 0"
                            @click="selectcolor(color.name)"
                        >
                            <span
                                class="block size-4 rounded-full"
                                :style="{ backgroundColor: color.name }"
                            ></span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="flex gap-2 mt-1 items-center">
                <button
                    class="border-2 bg-pink-300 px-2 rounded-full disabled:text-gray-400"
                    :disabled="product.available === 0"
                >
                    Agregar
                </button>
                <h1 v-if="product.available === 0" class="text-red-500">No disponible</h1>
            </div>
        </section>
    </div>
</template>

<style scoped>
:deep(.slick-slide) {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}

:deep(.slick-slide h3) {
    color: #fff;
}
</style>

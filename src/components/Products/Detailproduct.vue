<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '@/GlobalState/store'

const idProduct = ref("");
const productSource = ref("")
const product = ref({})
const currentColor = ref("")
const curentImage = ref(0)


const selectcolor = (color) => {
    currentColor.value = color
}

const nextImage = ()=>{
    if(curentImage.value === product.value.img.length - 1){
      return  curentImage.value = 0
    }
    curentImage.value ++
}

const previusImage = ()=>{
    if(curentImage.value === 0){
      return  curentImage.value = product.value.img.length - 1
    }
    return curentImage.value --
}

onMounted(async () => {
    const route = useRoute();
    idProduct.value = route.params.id
    productSource.value = route.params.source
    try {
        const response = await axios.get(`${BASE_URL}products/${productSource.value}/${idProduct.value}`)
        product.value = response.data
        startAutoChange()
    } catch (error) {
        console.error(error);
    }
})
const startAutoChange = () => {
    setInterval(() => {
        nextImage();
    }, 10000); 
}

</script>

<template>
    <div class=" flex items items-center">
        <section class="size-96 flex items-center">
            <button @click="previusImage" class="rounded-full"><</button>
            <transition name=" slice-fade" >
            <img class=" size-96 rounded-lg transition-opacity duration-500 " :src="product.img && product.img.length > 0 ? product.img[curentImage] : ''" :alt="product.name">
            </transition>
            <button @click="nextImage" class="rounded-full">></button>
            
        </section>
        <section class=" flex flex-col justify-center">
            <h1 class=" text-xl font-bold">{{ product.name }}</h1>
            <h1>{{ product.description }}</h1>
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

            <h1 class=" text-xl font-bold" v-if="product.crema">Tipo de crema: {{ product.crema }}</h1>
            <h1 class=" text-xl font-bold" v-if="product.skinType">Tipo de piel: {{ product.skinType }}</h1>

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
                <h1 v-if="product.available === 0" class=" text-red-500">No disponible</h1>
            </div>
        </section>
    </div>
</template>
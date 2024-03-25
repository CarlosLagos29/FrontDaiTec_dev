<script setup>
import { ref } from 'vue';

    const skincare = ref({
        name: "",
        img:[],
        description: "",
        skinType: "",
        price: 0,
        available: 0,
        crema: ""
    })
    const currentImage = ref("")
    const handlerChange = (event)=>{
        const name = event.target.name;
        const valor = event.target.value;

        skincare.value[name] = valor
        console.log(skincare.value);
    }
    const handlerImage = (event)=>{
        currentImage.value = event.target.value;
    }

    const setImage = ()=>{
        skincare.value.img = [...skincare.value.img, currentImage.value];
        currentImage.value = "";
    }
    const deleteImage = (event) =>{
        const deletedImage = skincare.value.img?.filter((i) => i !== event.target.value);
        skincare.value.img = deletedImage;
    }
</script>

<template>
    <div>
        <h1>skincares</h1>
        <h2>Name</h2>
        <input class="border border-slate-400" type="text" name="name" v-model="skincare.name" @change="handlerChange">
        <h2>img</h2>
        <h1> imagen actual {{ currentImage }}</h1>
        <ul class="flex gap-2" v-for="(image, index) in skincare.img ">
            <button class=" text-red-500 border rounded-full px-2" :value="image" @click="deleteImage"> X </button>
            <li :key="index">{{ image }}</li>
        </ul>
        <input class=" mt-2 border border-slate-400" type="text" name="img" v-model="currentImage" @keyup.enter="setImage" @change="handlerImage">
        <button class="border rounded-full px-2" @click="setImage"> agregar imagen </button>
        <h2>description</h2>
        <input class="border border-slate-400" type="text" name="description" v-model="skincare.description" @change="handlerChange">
        <h2>skinType</h2>
        <input class="border border-slate-400" type="text" name="skinType" v-model="skincare.skinType" @change="handlerChange">
        <h2>price</h2>
        <input class="border border-slate-400" type="number" name="price" v-model="skincare.price" @change="handlerChange">
        <h2>available</h2>
        <input class="border border-slate-400" type="number" name="available" v-model="skincare.available" @change="handlerChange">
        <h2>crema</h2>
        <input class="border border-slate-400" type="text" name="crema" v-model="skincare.crema" @change="handlerChange">
        
    </div>
</template>
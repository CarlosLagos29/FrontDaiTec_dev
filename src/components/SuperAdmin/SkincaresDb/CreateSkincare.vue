<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/GlobalState/store';
const skincare = ref({
    name: "",
    img: [],
    description: "",
    skinType: "",
    price: 0,
    available: 0,
    crema: "",
    discount: null
});

const currentImage = ref("");

const isDiscount = ref(false);

const handlerChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const valor = event.target.value;

    skincare.value[name] = valor
    console.log(skincare.value[name]);
}

const handlerImage = (event) => {
    event.preventDefault();
    currentImage.value = event.target.value;
};

const setImage = (event) => {
    event.preventDefault();
    skincare.value.img = [...skincare.value.img, currentImage.value];
    currentImage.value = "";
};
const deleteImage = (event) => {
    event.preventDefault();
    const deletedImage = skincare.value.img?.filter((i) => i !== event.target.value);
    skincare.value.img = deletedImage;
};

const discount = (event) =>{
    event.preventDefault()
    if(isDiscount){
        delete skincare.value.discount
    }
    if(skincare.value.discount){
        console.log(skincare.value.discount)
    }
    else{
        console.log("no existe")
    }
    isDiscount.value = !isDiscount.value
}

const setDiscount = (event) => {
    event.preventDefault();
    skincare.value.discount = {
        ofert: true,
        percent: event.target.value
    }
}

const submit = async (event) => {
    try {
        event.preventDefault();
        await axios.post(`${BASE_URL}products/skincares/`, skincare.value);
        skincare.value = {
            name: "",
            img: [],
            description: "",
            skinType: "",
            price: 0,
            available: 0,
            crema: ""
        }
    } catch (error) {
        console.error(error)
    }
};
</script>

<template>
    <form class="flex flex-col gap-y-2 m-2" action="" @submit.prevent="submit">

        <section class="flex justify-end">
            <button class="border border-slate-400 rounded-full px-2 " type="submit"> Agregar Producto </button>
        </section>

        <label>Nombre: {{ skincare.name }}</label>
        <input class="border border-slate-400 px-2 py-1 rounded-2xl" type="text" name="name" v-model="skincare.name"
            @change="handlerChange" @keydown.enter.prevent>

        <label>Tipo de piel</label>
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="text" name="skinType"
            v-model="skincare.skinType" @change="handlerChange" @keydown.enter.prevent>

        <label>Crema</label>
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="text" name="crema" v-model="skincare.crema"
            @change="handlerChange" @keydown.enter.prevent>

        <label>Precio</label>
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" name="price"
            v-model="skincare.price" @change="handlerChange" @keydown.enter.prevent>

        <button @click="discount">
            <span v-if="!isDiscount">Añadir Descuento</span>
            <span v-else>Eliminar Descuento</span>
        </button>
        <section v-if="isDiscount">
            <label> Descuento </label>
            <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" name="discount"
            v-model="skincare.discount" @change="setDiscount" @keydown.enter.prevent>
        </section>

        <label>Disponibilidad</label>
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" name="available"
            v-model="skincare.available" @change="handlerChange" @keydown.enter.prevent>

        <label>Descripcion</label>
        <textarea name="description" class="border border-slate-400 px-2 py-1  rounded-2xl" type="text"
            v-model="skincare.description" @change="handlerChange" cols="200" rows="10"></textarea>

        <label>Imagenes</label>
        <input class=" border border-slate-400 px-2 py-1  rounded-2xl " type="text" name="img" v-model="currentImage"
            @keyup.enter="setImage" @change="handlerImage" @keydown.enter.prevent >
        <button class="border rounded-full px-2 border-slate-400" @click="setImage"> Agregar imagen </button>
        <section class=" flex flex-row gap-2 max-w-screen-2xl overflow-scroll">
            <ul class="flex flex-col border border-slate-400 rounded-2xl p-2" v-for="(image, index) in skincare.img ">
                <button class=" text-red-500 border rounded-full px-2" :value="image" @click="deleteImage"> X </button>
                <img class=" size-64" :key="index" :src="image" :alt="image">
            </ul>
        </section>
    </form>
</template>
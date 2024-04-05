<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { BASE_URL } from '@/GlobalState/store';

const store = useStore();
const general = ref({
    name: "",
    img: [],
    description: "",
    price: 0,
    available: 0,
    colors: [],
    discount: 0,
});

const currentImage = ref("");
const currentColor = ref({
    name: "",
    availity: 0
});
const isDiscount = ref(false);

const discountedPrice = computed(() => {
    return general.value.price - (general.value.price * (general.value.discount / 100)).toFixed(2);
});

const handlerChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const valor = event.target.value;

    general.value[name] = valor
}

const handlerImage = (event) => {
    event.preventDefault();
    currentImage.value = event.target.value;
};
const setImage = (event) => {
    event.preventDefault();
    general.value.img = [...general.value.img, currentImage.value];
    currentImage.value = "";
};
const deleteImage = (event) => {
    event.preventDefault();
    const deletedImage = general.value.img?.filter((i) => i !== event.target.value);
    general.value.img = deletedImage;
};

const discount = (event) => {
    event.preventDefault()
    if (isDiscount) {
        general.value.discount = 0
    }
    isDiscount.value = !isDiscount.value
};

const handlerColor = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const valor = event.target.value;

    currentColor.value[name] = valor
};

const setColor = (event) => {
    event.preventDefault();
    general.value.colors = [...general.value.colors, currentColor.value];
    currentColor.value = {
        name: "",
        availity: 0
    };
};

const deletecolor = (event) => {

}
</script>

<template>
    <form class="flex flex-col gap-y-2 m-2" action="">

        <section class="flex justify-end">
            <button class="border border-slate-400 rounded-full px-2 " type="submit"> Agregar Producto </button>
        </section>

        <label>Nombre: {{ general.name }}</label>
        <input class="border border-slate-400 px-2 py-1 rounded-2xl" type="text" name="name" v-model="general.name"
            @change="handlerChange" @keydown.enter.prevent>

        <label>Precio</label>
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" name="price" v-model="general.price"
            @change="handlerChange" @keydown.enter.prevent>

        <button @click="discount">
            <span v-if="!isDiscount">Añadir Descuento</span>
            <span v-else>Eliminar Descuento</span>
        </button>
        <section v-if="isDiscount">
            <label> Descuento </label>
            <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" name="discount"
                v-model="general.discount" @change="handlerChange" @keydown.enter.prevent>
            <label> Precio con descuento: {{ discountedPrice }}</label>
        </section>

        <label>Descripcion</label>
        <textarea name="description" class="border border-slate-400 px-2 py-1  rounded-2xl" type="text"
            v-model="general.description" @change="handlerChange" cols="200" rows="10"></textarea>

        
        
        <label>Imagenes</label>
        <input class=" border border-slate-400 px-2 py-1  rounded-2xl" type="text" name="img" v-model="currentImage"
            @keyup.enter="setImage" @change="handlerImage" @keydown.enter.prevent>
        <button class="border rounded-full px-2 border-slate-400" @click="setImage"> Agregar imagen </button>
        <section class=" flex flex-row gap-2 max-w-screen-2xl overflow-scroll">
            <ul class="flex flex-col border border-slate-400 rounded-2xl p-2" v-for="(image, index) in general.img ">
                <button class=" text-red-500 border rounded-full px-2" :value="image" @click="deleteImage"> X </button>
                <img class=" size-64" :key="index" :src="image" :alt="image">
            </ul>
        </section>
    </form>
</template>
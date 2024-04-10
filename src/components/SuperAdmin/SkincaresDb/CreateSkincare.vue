<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { BASE_URL } from '@/GlobalState/store';

import axios from 'axios';
import creteValidate from '../ValidationSuperAdmin/create.validate';
import imageValidate from '../ValidationSuperAdmin/image.validate';

const skincare = ref({
    name: "",
    img: [],
    source: 'skincares',
    description: "",
    skinType: "",
    price: null,
    available: 0,
    crema: "",
    discount: 0,
});

const errors = ref([1]);
const errorImage = ref([1]);

const store = useStore();
const currentImage = ref("");

const isDiscount = ref(false);

const discountedPrice = computed(() => {
    return skincare.value.price - (skincare.value.price * (skincare.value.discount / 100)).toFixed(2);
});

const handlerChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const valor = event.target.value;

    skincare.value[name] = valor
    console.log(skincare.value.discount)
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

const discount = (event) => {
    event.preventDefault()
    if (isDiscount) {
        skincare.value.discount = 0
    }
    isDiscount.value = !isDiscount.value;
    console.log(errors.value)
}


const submit = async (event) => {
    console.log(skincare.value.available);
    try {
        event.preventDefault();

        const path = `${BASE_URL}products/skincares/`
        await axios.post(path, skincare.value);
        skincare.value = {
            name: "",
            img: [],
            source: 'skincares',
            description: "",
            skinType: "",
            price: null,
            available: 0,
            crema: "",
            discount: 0,
        }
        await store.dispatch('getAdminview', path)
    } catch (error) {
        console.error(error)
    }
};

watch(skincare, (newValue) => {
    errors.value = creteValidate(newValue);
}, { deep: true });

watch(currentImage, (newValue) => {

    errorImage.value = imageValidate(newValue)
});

</script>

<template>
    <form class="flex flex-col gap-y-2 m-2" action="" @submit.prevent="submit">

        <section class="flex justify-end">
            <button class="border border-slate-400 rounded-full px-2 disabled:opacity-50" type="submit"
                :disabled="Object.values(errors).length"> Agregar Producto </button>
        </section>

        <label>Nombre</label>
        <input class="border border-slate-400 px-2 py-1 rounded-2xl" type="text" name="name" v-model="skincare.name"
            @change="handlerChange" @keydown.enter.prevent>
        <p v-if="errors.name" class=" text-red-500">{{ errors.name }}</p>

        <label>Tipo de piel</label>
        <select class="border border-slate-400 px-2 py-1  rounded-2xl" name="skinType" @change="handlerChange"
            v-model="skincare.skinType">
            <option value="">Seleccione una opcion</option>
            <option value="Facial">Facial</option>
            <option value="Corporal">Corporal</option>
            <option value="Facial y Coporal">Facial y Coporal</option>
        </select>
        <p v-if="errors.skinType" class=" text-red-500">{{ errors.skinType }}</p>

        <label>Crema</label>
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="text" name="crema" v-model="skincare.crema"
            @change="handlerChange" @keydown.enter.prevent>
        <p v-if="errors.crema" class=" text-red-500">{{ errors.crema }}</p>

        <label>Precio</label>
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" step="any" name="price" min="0"
            v-model="skincare.price" @change="handlerChange" @keydown.enter.prevent>
        <p v-if="errors.price" class=" text-red-500"> {{ errors.price }}</p>

        <button @click="discount" class=" border rounded-full px-2 border-slate-400">
            <span v-if="!isDiscount">Añadir Descuento</span>
            <span v-else>Eliminar Descuento</span>
        </button>
        <section v-if="isDiscount">
            <label> Descuento: % </label>
            <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" step="any" name="discount"
                min="0" max="99.99" v-model="skincare.discount" @change="handlerChange" @keydown.enter.prevent>
            <label> Precio con descuento: {{ discountedPrice }}</label>
            <p v-if="errors.discount" class=" text-red-500">{{ errors.discount }}</p>
        </section>

        <label>Disponibilidad</label>
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" name="available" min="0"
            v-model="skincare.available" @change="handlerChange" @keydown.enter.prevent>
        <p v-if="errors.available" class=" text-red-500">{{ errors.available }}</p>

        <label>Descripcion</label>
        <textarea name="description" class="border border-slate-400 px-2 py-1  rounded-2xl w-full" type="text"
            v-model="skincare.description" @change="handlerChange" cols="200" rows="5"></textarea>
        <p v-if="errors.description" class=" text-red-500">{{ errors.description }}</p>

        <label>Imagenes</label>
        <input class=" border border-slate-400 px-2 py-1  rounded-2xl" type="text" name="img" v-model="currentImage"
            @keyup.enter="setImage" @change="handlerImage" @keydown.enter.prevent>
        <p v-if="errorImage.currentImg" class=" text-red-500">{{ errorImage.currentImg }} </p>

        <button class="border rounded-full px-2 border-slate-400 disabled:opacity-50 " @click="setImage"
            :disabled="Object.values(errorImage).length || currentImage.trim() === ''"> Agregar imagen </button>

        <p v-if="errors.img" class=" text-red-500 text-center ">{{ errors.img }}</p>

        <section class=" flex flex-wrap justify-center gap-2 max-w-screen-2xl">
            <ul class="flex flex-col border border-slate-400 rounded-2xl p-2" v-for="(image, index) in skincare.img ">
                <button class=" text-red-500 border rounded-full px-2" :value="image" @click="deleteImage"> X </button>
                <img class=" size-64" :key="index" :src="image" :alt="image">
            </ul>
        </section>
    </form>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted, computed,defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    path: String,
    currentSource: String
});

const store = useStore()
const general = ref({});

const currentImage = ref("");
const currentColor = ref({
    name: "",
    availity: null
});

const isDiscount = ref(false);

const setAvaility = ref("");

const discountedPrice = computed(() => {
    return general.value.price - (general.value.price * (general.value.discount / 100)).toFixed(2);
});

const handlerChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const valor = event.target.value;

    general.value[name] = valor;
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
const avalityType = (event) => {
    event.preventDefault()
    setAvaility.value = event.target.value
}

const handlerColor = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const valor = event.target.value;

    currentColor.value[name] = valor;
    console.log(currentColor.value);

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
    event.preventDefault()
    const deletedcolor = general.value.colors?.filter((i) => i.name !== event.target.value);
    general.value.colors = deletedcolor;
};

const updateProduct = async(event) =>{
    try {
        event.preventDefault();
        await axios.put(`${props.path}${general.value._id}`, general.value);
        store.dispatch('setResetEdit');
        await store.dispatch('getAdminview',props.path);
    } catch (error) {
        console.error(error)
    }
};

onMounted(()=>{
    if(store.state.edit?.source && store.state.edit?.source === props.currentSource ){
        general.value =  store.state.edit;
        if(general.value.discount != 0){
            isDiscount.value = true;
        }
        if(general.value.colors?.length){
            setAvaility.value = 'Por color';
        }
    }
})
</script>

<template>
    <form class="flex flex-col gap-y-2 m-2" action="" @submit.prevent="updateProduct">

<section class="flex justify-end">
    <button class="border border-slate-400 rounded-full px-2 " type="submit"> Actualizar Producto </button>
</section>

<label>Nombre: {{ general.name }}</label>
<input class="border border-slate-400 px-2 py-1 rounded-2xl" type="text" name="name" v-model="general.name"
    @change="handlerChange" @keydown.enter.prevent>

<label>Precio</label>
<input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" step="any" name="price" v-model="general.price"
    @change="handlerChange" @keydown.enter.prevent>

<button @click="discount">
    <span v-if="!isDiscount">Añadir Descuento</span>
    <span v-else>Eliminar Descuento</span>
</button>
<section v-if="isDiscount">
    <label> Descuento </label>
    <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" step="any" name="discount"
        v-model="general.discount" @change="handlerChange" @keydown.enter.prevent>
    <label> Precio con descuento: {{ discountedPrice }}</label>
</section>

<label>Descripcion</label>
<textarea name="description" class="border border-slate-400 px-2 py-1  rounded-2xl" type="text"
    v-model="general.description" @change="handlerChange" cols="200" rows="10"></textarea>


<section>
    <h1>Seleccione tipo de disponibilidad</h1>
    <div class=" flex gap-20 p-3">
        <button class=" rounded-2xl px-2 py-1" :class="{ ' bg-pink-300': setAvaility === 'Estandar' }"
            @click="avalityType" value="Estandar">
            Estandar
        </button>
        <button class=" rounded-2xl px-2 py-1" :class="{ ' bg-pink-300': setAvaility === 'Por color' }"
            @click="avalityType" value="Por color">
            Por color
        </button>
    </div>
    <div v-if="setAvaility === 'Estandar'">
        <input class="border border-slate-400 px-2 py-1  rounded-2xl" type="number" name="available"
            v-model="general.available" @change="handlerChange" @keydown.enter.prevent>
    </div>
    <div v-if="setAvaility === 'Por color'" class=" flex items-center gap-2 ">

        <label>Color: </label>
        <input class=" border border-slate-400 px-2 py-1  rounded-2xl" type="text" name="name"
            v-model="currentColor.name" @change="handlerColor" @keydown.enter.prevent>

        <label> Cantidad: </label>
        <input class=" border border-slate-400 px-2 py-1  rounded-2xl" type="number" name="availity"
            v-model="currentColor.availity" @change="handlerColor" @keydown.enter.prevent>
        <button class="border rounded-full px-2 py-1 border-slate-400" @click="setColor"> Agregar Color
        </button>
    </div>

    <ul v-if="setAvaility === 'Por color'" class=" flex flex-wrap gap-2 py-2 ">
        <li v-for="(color, index) in general.colors" :key="index"
            class="flex flex-col gap-1 border rounded-2xl p-1">
            <button class="text-red-500 border rounded-full px-2" :value="color.name" @click="deletecolor"> X
            </button>
            <p class=" flex items-center gap-1"><span class="block size-4 rounded-full"
                    :style="{ backgroundColor: color.name }"></span> {{ color.name }}</p>
            <p>Cantidad: {{ color.availity }}</p>
        </li>
    </ul>
</section>

<label>Imagenes</label>
<input class=" border border-slate-400 px-2 py-1  rounded-2xl" type="text" name="colors" v-model="currentImage"
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
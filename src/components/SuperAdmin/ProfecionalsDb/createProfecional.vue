<script setup>
import { ref, h, computed } from 'vue';
import { BASE_URL } from '@/GlobalState/store';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';

import uniqueImage from '../Reutilizables/Inputs/uniqueImage.vue';
import axios from 'axios';

const { dispatch } = useStore();

const newProfecional = ref({
    name: "",
    img: "",
    description: "",
    services: [],
});

const emit = defineEmits(['handleCreate']);

const handleCreateImg = (img) => {
    newProfecional.value.img = img;
};

const currentService = ref("");

const handleSetService = () => {
   if (currentService.value && !newProfecional.value.services.includes(currentService.value)){
        newProfecional.value.services.push(currentService.value);

    currentService.value = "";

    }
};

const handleDeleteService = (service) =>{
    const index = newProfecional.value.services.indexOf(service);
  if (index > -1) {
    newProfecional.value.services.splice(index, 1);
  }
}

const cancel = async () => {
    const imgToDelete = newProfecional.value.img;
    try {
        if (newProfecional.value.img.trim() !== "") {
            await axios.delete(`${BASE_URL}images/`, { data: { imageUrl: imgToDelete } });
        }
        emit('handleCreate');
    } catch (error) {
        console.error(error)
    }
};

const submit = async () => {
    try {
        await axios.post(`${BASE_URL}users/profecionals/`, newProfecional.value);
        message.success(`El profecinal "${newProfecional.value.name}" fue creado con exito`);
        emit('handleCreate');
        dispatch('getProfecionals');
    } catch (error) {
        message.error('Error al cargar el Profecional');
        console.error(error)
    }finally {
            const loadingMessage = message.loading('Subiendo profecional...', 0);
            loadingMessage();
        }
};
</script>

<template>
    <form @keydown.enter.prevent @submit.prevent="submit"> 
        <section>
            <button type="button"
                class=" border border-red-500 rounded-md px-4 py-2 text-buttons hover:text-white hover:bg-red-500 "
                @click="cancel"> Cancelar </button>
        </section>

        <label>Nombre: </label>
        <input class="border border-slate-400 px-2 py-1 rounded-md placeholder:italic" placeholder="ejemplo:Rodrigo..."
            type="text" name="nameModel" v-model="newProfecional.name">

        <label> Foto: </label>
        <uniqueImage :url="newProfecional.img" @handleCreateImg="handleCreateImg"
            @handleDeleteImg="() => newProfecional.img = ''" />

        <label> Descripcion: </label>
        <textarea name="description" class="border border-slate-400 px-2 py-1 rounded-md w-full" type="text"
        v-model="newProfecional.description" cols="200" rows="5" @keydown.enter.prevent="false"></textarea>

        <label> Servicios:</label>
        <section class=" flex gap-2">
            <input class="border border-slate-400 px-2 py-1 rounded-md placeholder:italic" placeholder="ejemplo:Rodrigo..."
            type="text" name="service" v-model="currentService">
            <button @click="handleSetService" type="button">Agregar servicio</button>
        </section>

        <ul v-if="newProfecional.services.length" v-for="(s, i) in newProfecional.services">
            <li :key="i">
                <button @click="handleDeleteService(s)" type="button">{{ s }}</button>
            </li>
        </ul>
        <a-button html-type="submit">Submit</a-button>
    </form>
</template>
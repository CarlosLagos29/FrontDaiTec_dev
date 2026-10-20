<script setup>
import { ref, onMounted } from "vue";
import { BASE_URL } from "@/GlobalState/store";
import { message } from "ant-design-vue";
import { useStore } from "vuex";

import uniqueImage from "../Reutilizables/Inputs/uniqueImage.vue";
import axios from "axios";

const { dispatch } = useStore();

const isEditing = ref(false);

const props = defineProps({
    profecional: {
        type: Object,
        default: () => ({
            name: "",
            img: "",
            description: "",
            services: [],
        }),
    },
});

const newProfecional = ref({});
const imageInput = ref(null);

const emit = defineEmits(["handleCreate"]);

const handleCreateImg = (img) => {
    newProfecional.value.img = img;
};

const currentService = ref("");

const handleSetService = () => {
    if (currentService.value && !newProfecional.value.services.includes(currentService.value)) {
        newProfecional.value.services.push(currentService.value);

        currentService.value = "";
    }
};

const handleDeleteService = (service) => {
    const index = newProfecional.value.services.indexOf(service);
    if (index > -1) {
        newProfecional.value.services.splice(index, 1);
    }
};

const cancel = async () => {
    if (isEditing.value === true) {
        dispatch("setResetEdit");
    } else {
        const imgToDelete = newProfecional.value.img;
        try {
            if (newProfecional.value.img.trim() !== "") {
                await axios.delete(`${BASE_URL}images/`, { data: { imageUrl: imgToDelete } });
            }
            emit("handleCreate");
        } catch (error) {
            console.error(error);
        }
    }
};

const submit = async () => {
    if (isEditing.value === true) {
        try {
            await axios.put(
                `${BASE_URL}users/profecionals/${newProfecional.value._id}`,
                newProfecional.value,
            );
            imageInput.value.markSaved();
            message.success(`El profecinal "${newProfecional.value.name}" fue edito`);
            dispatch("setResetEdit");
        } catch (error) {
            message.error("Error al editar el Profecional");
            console.error(error);
        } finally {
            const loadingMessage = message.loading("Editando profecional...", 0);
            loadingMessage();
        }
    } else {
        try {
            await axios.post(`${BASE_URL}users/profecionals/`, newProfecional.value);
            imageInput.value.markSaved();
            message.success(`El profecinal "${newProfecional.value.name}" fue creado con exito`);
            emit("handleCreate");
            dispatch("getProfecionals");
        } catch (error) {
            message.error("Error al cargar el Profecional");
            console.error(error);
        } finally {
            const loadingMessage = message.loading("Subiendo profecional...", 0);
            loadingMessage();
        }
    }
};

onMounted(() => {
    newProfecional.value = props.profecional;
    if (props.profecional._id) {
        isEditing.value = true;
    }
});
</script>

<template>
    <form @keydown.enter.prevent @submit.prevent="submit">
        <section>
            <button
                type="button"
                class="border border-red-500 rounded-md px-4 py-2 text-buttons hover:text-white hover:bg-red-500"
                @click="cancel"
            >
                Cancelar
            </button>
        </section>

        <label>Nombre: </label>
        <input
            v-model="newProfecional.name"
            class="border border-slate-400 px-2 py-1 rounded-md placeholder:italic"
            placeholder="ejemplo:Rodrigo..."
            type="text"
            name="nameModel"
        />

        <label> Foto: </label>
        <uniqueImage
            ref="imageInput"
            :url="newProfecional.img"
            @handle-create-img="handleCreateImg"
            @handle-delete-img="() => (newProfecional.img = '')"
        />

        <label> Descripcion: </label>
        <textarea
            v-model="newProfecional.description"
            name="description"
            class="border border-slate-400 px-2 py-1 rounded-md w-full"
            type="text"
            cols="200"
            rows="5"
            @keydown.enter.prevent="false"
        ></textarea>

        <label> Servicios:</label>
        <section class="flex gap-2">
            <input
                v-model="currentService"
                class="border border-slate-400 px-2 py-1 rounded-md placeholder:italic"
                placeholder="ejemplo:Rodrigo..."
                type="text"
                name="service"
            />
            <button type="button" @click="handleSetService">Agregar servicio</button>
        </section>

        <ul v-if="newProfecional.services?.length">
            <li v-for="s in newProfecional.services" :key="s">
                <button type="button" @click="handleDeleteService(s)">{{ s }}</button>
            </li>
        </ul>
        <a-button html-type="submit">Submit</a-button>
    </form>
</template>

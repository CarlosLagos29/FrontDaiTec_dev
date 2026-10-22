<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import { BASE_URL } from "@/api/config";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import type { Promo } from "@/types";

import uniqueImage from "../Reutilizables/Inputs/uniqueImage.vue";
import axios from "axios";

const { dispatch } = useStore();
const newPromo = ref<Pick<Promo, "name" | "url">>({
    name: "",
    url: "",
});

const imageInput = useTemplateRef("imageInput");

const emit = defineEmits<{
    handleCreate: [];
}>();

const handleCreateImg = (img: string) => {
    newPromo.value.url = img;
};

const submit = async () => {
    if (newPromo.value.name.trim() === "" || newPromo.value.url.trim() === "") {
        message.warn("Hay campos por completar");
    } else {
        try {
            await axios.post(`${BASE_URL}promos/`, newPromo.value);
            imageInput.value?.markSaved();
            message.success(`La promo "${newPromo.value.name}" fue creado con exito`);
            emit("handleCreate");
            dispatch("getPromos");
        } catch (error) {
            message.error("Error al cargar la promo");
            console.error(error);
        } finally {
            const loadingMessage = message.loading("Subiendo promocion...", 0);
            loadingMessage();
        }
    }
};
</script>

<template>
    <form
        class="mt-4 flex flex-col gap-3 justify-center w-full"
        @keydown.enter.prevent
        @submit.prevent="submit"
    >
        <section>
            <button
                type="button"
                class="border border-red-500 rounded-md px-4 py-2 text-buttons hover:text-white hover:bg-red-500"
                @click="emit('handleCreate')"
            >
                Cancelar
            </button>
        </section>

        <label>Nombre: </label>
        <input
            v-model="newPromo.name"
            class="border border-slate-400 px-2 py-1 rounded-md placeholder:italic"
            placeholder="ejemplo: promo 1"
            type="text"
            name="nameModel"
        />
        <!-- <a-alert class=" rounded-md py-1 text-red-600 " v-if="errors.name" type="error" :message="errors.name" banner /> -->

        <label>Imagen promocional: </label>
        <uniqueImage
            ref="imageInput"
            :url="newPromo.url"
            @handle-create-img="handleCreateImg"
            @handle-delete-img="() => (newPromo.url = '')"
        />

        <a-button html-type="submit">Submit</a-button>
    </form>
</template>

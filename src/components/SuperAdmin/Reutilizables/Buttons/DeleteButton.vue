<script setup>
import { BASE_URL } from "@/GlobalState/store";
import { message } from "ant-design-vue";
import { h } from "vue";
import { DeleteOutlined } from '@ant-design/icons-vue'
import axios from "axios";

const { id, type, name } = defineProps({
    id: Number,
    type: String,
    name: String,
});

const handleDelete = async () => {
    try {
        await axios.delete(`${BASE_URL}${type}/${id}`);

        const succesMessage = message.success(`Se elimino ${name}`)
    } catch (error) {
        const errorMessage = message.error(`Se produjo un error al eliminar ${name}`,0);
        errorMessage();
        console.error(error);
    } finally{
        const loadingMessage = message.loading(`Eliminando ${name}...`, 0);
        loadingMessage();
    }
};

</script>

<template>
    <a-popconfirm title="¿Seguro que quieres eliminarlo?" ok-text="Si" cancel-text="No" @confirm="handleDelete">
        <a-button class=" full-width-button flex justify-center items-center" type="primary" danger
            :icon="h(DeleteOutlined)" />
    </a-popconfirm>
</template>
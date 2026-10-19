<script setup>
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons-vue'
import { h, onUnmounted, onMounted } from 'vue';
import { BASE_URL } from '@/GlobalState/store';
import { message } from 'ant-design-vue';

import axios from 'axios';
import deleteCloud from '../Functions/deleteCloud';


const props = defineProps({
    url: String,
});

const emit = defineEmits(['handleCreateImg', 'handleDeleteImg']);

// Imagenes subidas desde este componente: si no se guardan, se limpian de Cloudinary
const uploadedUrls = new Set();
// Imagenes ya guardadas que se quitaron del form: se borran de Cloudinary recien al guardar
const pendingDeletes = new Set();
let saved = false;

const markSaved = () => {
    saved = true;
    pendingDeletes.forEach((url) => deleteCloud(url));
    pendingDeletes.clear();
};

defineExpose({ markSaved });

const deleteUnsavedImage = () => {
    if (!saved && uploadedUrls.has(props.url)) {
        deleteCloud(props.url);
    }
};

const handleBeforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Solo puedes subir archivos JPG/PNG!');
    }
    return isJpgOrPng;
};

const handleCustomRequest = async ({ file }) => {
    const formData = new FormData();
    formData.append('image', file);
    const loadingMessage = message.loading('Subiendo imagen...', 0);
    try {
        const { data } = await axios.post(`${BASE_URL}images/`, formData);
        if (data) {
            message.success('Imagen subida exitosamente!');
            uploadedUrls.add(data.imageUrl);
            emit('handleCreateImg', data.imageUrl);
        }
    } catch (error) {
        message.error('Error al subir la imagen');
        console.error('Error:', error);
    } finally {
        loadingMessage();
    }
};

const removeImage = async () => {
    const imgToDelete = props.url;

    if (!uploadedUrls.has(imgToDelete)) {
        pendingDeletes.add(imgToDelete);
        emit('handleDeleteImg');
        return;
    }

    const loadingMessage = message.loading('Eliminando imagen...', 0);
    try {
        await axios.delete(`${BASE_URL}images/`, { data: { imageUrl: imgToDelete } } );
        message.success('Imagen eliminada exitosamente!');
        uploadedUrls.delete(imgToDelete);
        emit('handleDeleteImg');
    } catch (error) {
        message.error('Error al eliminar la imagen');
        console.error(error)
    } finally {
        loadingMessage();
    }
};

onMounted(() => {
    window.addEventListener('beforeunload', deleteUnsavedImage);
});

onUnmounted(() => {
    window.removeEventListener('beforeunload', deleteUnsavedImage);
    deleteUnsavedImage();
});

</script>

<template>
    <div>
        <a-upload-dragger v-if="props.url === ''" class=" p-5 -mt-2" :before-upload="handleBeforeUpload"
            :show-upload-list="false" :custom-request="handleCustomRequest">
            <p class="ant-upload-drag-icon">
                <InboxOutlined style="color: #7364d2" />
            </p>
            <p class="ant-upload-text">Haz clic o arrastra el archivo a esta área para subirlo</p>
            <p class="ant-upload-hint">
                Soporte para una carga individual. Solo se admiten archivos PNG o JPG.
            </p>
        </a-upload-dragger>

        <section v-else class=" grid justify-center gap-3 shadow-custom rounded-md p-4">
            <a-button class="full-width-button" type="primary" danger :icon="h(DeleteOutlined)"
                @click="removeImage()" />
            <a-image class="max-h-96 rounded-md " :src="url" :alt="url" />
        </section>
    </div>
</template>
<script setup lang="ts">
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import { BASE_URL } from "@/api/config";
import { message } from "ant-design-vue";
import type { UploadProps } from "ant-design-vue";
import axios from "axios";

const props = defineProps<{
    images: string[];
}>();

const emit = defineEmits<{
    handleEmit: [url: string];
    handleDeleteImage: [index: number];
}>();

const handleBeforeUpload: NonNullable<UploadProps["beforeUpload"]> = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("Solo puedes subir archivos JPG/PNG!");
    }
    return isJpgOrPng;
};

const handleCustomRequest: NonNullable<UploadProps["customRequest"]> = async ({ file }) => {
    const loadingMessage = message.loading("Subiendo imágenes...", 0);

    try {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await axios.post<{ imageUrl: string }>(`${BASE_URL}images/`, formData);
        if (data) {
            message.success("Imagen subida exitosamente!");
            emit("handleEmit", data.imageUrl);
        }
    } catch (error) {
        message.error("Error al subir la imagen");
        console.error("Error:", error);
    } finally {
        loadingMessage();
    }
};

const removeImage = async (index: number) => {
    const imgToDelete = props.images[index];
    const loadingMessage = message.loading("Eliminando imagen...", 0);
    try {
        await axios.delete(`${BASE_URL}images/`, { data: { imageUrl: imgToDelete } });
        message.success("Imagen eliminada exitosamente!");
        emit("handleDeleteImage", index);
    } catch (error) {
        message.error("Error al eliminar la imagen");
        console.error(error);
    } finally {
        loadingMessage();
    }
};
</script>

<template>
    <div class="grid">
        <a-upload-dragger
            class="max-h-36"
            :before-upload="handleBeforeUpload"
            :show-upload-list="false"
            :custom-request="handleCustomRequest"
            multiple
        >
            <p class="ant-upload-drag-icon">
                <InboxOutlined style="color: #7364d2" />
            </p>
            <p class="ant-upload-text">Haz clic o arrastra archivos a esta área para subirlos</p>
            <p class="ant-upload-hint">
                Soporte para carga múltiple. Solo se admiten archivos PNG o JPG.
            </p>
        </a-upload-dragger>

        <section v-if="images.length" class="flex flex-wrap gap-3 rounded-md p-2">
            <a-image-preview-group>
                <span
                    v-for="(img, index) in images"
                    :key="index"
                    class="grid gap-y-1 rounded-md p-2 shadow-custom"
                >
                    <a-button
                        class="full-width-button"
                        type="primary"
                        danger
                        :icon="h(DeleteOutlined)"
                        @click="removeImage(index)"
                    />
                    <a-image class="max-h-72 rounded-md" :src="img" :alt="`imagen ${index}`" />
                </span>
            </a-image-preview-group>
        </section>
    </div>
</template>

<style scoped>
.full-width-button {
    width: 100%;
}
</style>

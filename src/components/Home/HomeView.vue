<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const { dispatch, state } = useStore();

onMounted(() => {
    dispatch("getPromos");
});
</script>

<template>
    <div class="flex justify-center items-center">
        <a-carousel autoplay>
            <section
                v-for="(img, index) in state.promos"
                :key="index"
                class="flex justify-center items-center"
            >
                <img :src="img.url" :alt="img.name" />
            </section>
        </a-carousel>
    </div>
</template>

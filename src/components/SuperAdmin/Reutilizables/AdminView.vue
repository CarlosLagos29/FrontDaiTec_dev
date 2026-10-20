<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import CardAdminView from "./CardAdminView.vue";

const props = defineProps({
    source: String,
});

const { state, dispatch } = useStore();

onMounted(() => dispatch("getAdminview", props.source));
</script>

<template>
    <div class="flex flex-wrap">
        <CardAdminView v-for="(p, index) in state.adminView" :key="index" :product="p" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import CardAdminView from "./CardAdminView.vue"

const props = defineProps({
    route: String
});


const { state, dispatch } = useStore();

onMounted(dispatch('getAdminview'));

</script>

<template>
    <div class="flex flex-wrap">
        <CardAdminView v-for="(p, index) in state.adminView" :key="index" :product="p" :path="fullpath" />
    </div>
</template>
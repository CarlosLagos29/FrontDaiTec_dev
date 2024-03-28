<script setup>
import { onMounted,ref } from 'vue';
import { BASE_URL } from '@/GlobalState/store';
import { useStore } from 'vuex';
import CardAdminView from "./CardAdminView.vue"

const props = defineProps({
    route: String
})


const store = useStore()
const fullpath = `${BASE_URL}${props.route}`

onMounted(async () => {
    try {
        await store.dispatch('getAdminview',fullpath)
    } catch (error) {
        console.error(error);
    }
});

</script>

<template>
    <div class="flex flex-wrap">
        <CardAdminView v-for="(p, index) in store.state.adminView" :key="index" :product="p" :path="fullpath"/>
    </div>
</template>
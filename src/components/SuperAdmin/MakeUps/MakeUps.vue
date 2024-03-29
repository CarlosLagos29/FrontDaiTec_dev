<script setup>
import AdminView from '../Reutilizables/AdminView.vue';
import { useStore } from 'vuex';

const store = useStore()

</script>

<template>
    <div>
        <h1>MakeUps</h1>
        <h1 v-if=" store.state.edit?.source && store.state.edit?.source === 'makeups'">estoy editando</h1>
        <AdminView :route="'products/makeups/'"/>
    </div>
</template>
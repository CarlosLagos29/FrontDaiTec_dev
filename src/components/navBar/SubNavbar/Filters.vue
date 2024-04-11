<script setup>
import { BASE_URL } from '@/GlobalState/store';
import { useStore } from 'vuex';

const store = useStore();

const productHandler = async (event) => {
    try {
        let path = `${BASE_URL}products/${event.target.value}`
        console.log(path);
        await store.dispatch('getProduct', path);
    } catch (error) {
        console.error(error)
    }
}

</script>

<template>
    <div>
        <select @change="productHandler" class="border px-2 border-slate-400 rounded-full">
            <option value="">Productos</option>
            <option value="generals">Generales</option>
            <option value="makeups">Makeups</option>
            <option value="skincares">Skincares</option>
        </select>
    </div>
</template>
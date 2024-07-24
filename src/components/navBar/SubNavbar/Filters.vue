<script setup>
import { useStore } from 'vuex';

const store = useStore();

const productHandler = async (event) => {
    try {
        await store.dispatch('getProduct', event.target.value);
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
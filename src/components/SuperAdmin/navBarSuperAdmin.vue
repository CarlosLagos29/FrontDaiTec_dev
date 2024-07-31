<script setup>
// import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';

const { state, commit } = useStore();

const changeSection = (page) => {
    commit('setDashboard', page)
};



</script>

<template>
    <nav class="gap-3 flex flex-col justify-center items-center text-xl">

        <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "
            :class="{ 'bg-pink-300': state.currentDashboard === 'Promos' }"
            @click="changeSection('Promos')">
            Promos
        </button>

        <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "
            :class="{ 'bg-pink-300': state.currentDashboard === 'Productos Gennerales' }"
            @click="changeSection('Productos Gennerales')">
            Productos Gennerales
        </button>

        <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "
            :class="{ 'bg-pink-300': state.currentDashboard === 'MakeUps' }" @click="changeSection('MakeUps')">
            MakeUps
        </button>

        <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "
            :class="{ 'bg-pink-300': state.currentDashboard === 'Skincares' }" @click="changeSection('Skincares')">
            Skincares
        </button>

        <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "
            :class="{ 'bg-pink-300': state.currentDashboard === 'Servicios' }" @click="changeSection('Servicios')">
            Servicios
        </button>

        <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "
            :class="{ 'bg-pink-300': state.currentDashboard === 'Ofertas' }" @click="changeSection('Ofertas')">
            Ofertas
        </button>

        <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "
            :class="{ 'bg-pink-300': state.currentDashboard === 'Turnos' }" @click="changeSection('Turnos')">
            Turnos
        </button>

        <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "
            :class="{ 'bg-pink-300': state.currentDashboard === 'Profecionales' }"
            @click="changeSection('Profecionales')">
            Profesionales
        </button>
    </nav>
</template>
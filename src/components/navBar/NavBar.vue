<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="gap-3 flex items-center justify-center py-8 text-xl">
        <RouterLink to="/">
           <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 ">Inicio</button>
        </RouterLink>
        <RouterLink to="/productos">
            <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 "> Productos</button>
        </RouterLink>
        <RouterLink to="/servicios">
            <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 ">Servicios</button>
        </RouterLink>
        <RouterLink to="/profecionales">
            <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 ">Profecionales</button>
        </RouterLink>
        <RouterLink to="/ubicacion">
            <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 ">Ubicacion</button>
        </RouterLink>
    </nav>
</template>
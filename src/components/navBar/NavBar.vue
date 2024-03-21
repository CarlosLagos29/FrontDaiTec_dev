<script setup>
    import { RouterLink } from 'vue-router';
    import { onMounted, ref } from 'vue';

    const currentPage = ref("");

    onMounted(()=>{
        currentPage.value = localStorage.getItem('currentPage') || 'Inicio'
    }); 

    const changeCurrentPage = (page)=>{
        currentPage.value = page
        localStorage.setItem('currentPage', page)
    };
</script>

<template>
    <nav class="gap-3 flex items-center justify-center py-8 text-xl">
        <RouterLink to="/">
           <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 " :class="{'bg-pink-300' : currentPage === 'Inicio' }" @click="changeCurrentPage('Inicio')">
            Inicio
        </button>
        </RouterLink>
        <RouterLink to="/productos">
            <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 " :class="{'bg-pink-300' : currentPage === 'Productos' }" @click="changeCurrentPage('Productos')"> 
                Productos
            </button>
        </RouterLink>
        <RouterLink to="/servicios">
            <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 " :class="{'bg-pink-300' : currentPage === 'Servicios' }" @click="changeCurrentPage('Servicios')">
                Servicios
            </button>
        </RouterLink>
        <RouterLink to="/profecionales">
            <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 " :class="{'bg-pink-300' : currentPage === 'Profecionales' }" @click="changeCurrentPage('Profecionales')">
                Profecionales
            </button>
        </RouterLink>
        <RouterLink to="/ubicacion">
            <button class=" hover:bg-pink-300 transition duration-500 rounded-2xl p-2 " :class="{'bg-pink-300' : currentPage === 'Ubicacion' }" @click="changeCurrentPage('Ubicacion')">
                Ubicacion
            </button>
        </RouterLink>
    </nav>
</template>
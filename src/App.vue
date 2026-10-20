<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/navBar/NavBar.vue";
</script>

<template>
    <header>
        <nav>
            <NavBar />
        </nav>
    </header>
    <RouterView />
</template>

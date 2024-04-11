<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components//navBar/NavBar.vue'

const route = useRoute();

</script>

<template>
  <header>
      <nav>
        <NavBar />
      </nav>
  </header>
  <RouterView />
</template>

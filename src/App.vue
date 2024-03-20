<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components//navBar/NavBar.vue'
</script>

<template>
  <header>
    <div>
      <nav>
        <NavBar/>
      </nav>
    </div>
  </header>
  <RouterView />
</template>


<script setup>
import { RouterView, useRoute} from 'vue-router'
import { computed } from 'vue';
import NavBar from './components//navBar/NavBar.vue'
import SearchBar from './components/navBar/SearchBar.vue'

const route = useRoute();
    const superAdmin = computed(() =>{
        console.log(route.fullPath);
        return route.path == '/superAdmin'

    })
</script>

<template>
  <header>
    <div>
      <nav>
        <NavBar/>
        <SearchBar v-if="!superAdmin"/>
      </nav>
    </div>
  </header>
  <RouterView />
</template>


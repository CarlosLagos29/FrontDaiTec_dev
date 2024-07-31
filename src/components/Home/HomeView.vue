<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const { dispatch, state } = useStore();


onMounted(() => {
  dispatch('getPromos')
}
)


</script>

<template>
  <div class=" flex justify-center items-center">

    <a-carousel autoplay>
      <section class="flex justify-center items-center" v-for="(img, index) in state.promos" :key="index">
        <img  :src="img.url" :alt="img.name">
      </section>
    </a-carousel>
  </div>
</template>

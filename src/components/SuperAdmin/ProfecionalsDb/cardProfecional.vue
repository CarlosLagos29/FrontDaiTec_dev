<script setup>
import deleteButton from '../Reutilizables/Buttons/deleteButton.vue';

const props = defineProps({
    profecional: Object,
})
</script>

<template>
    <div class=" w-[50%] ">
        <section class="flex items-center" @click=" ">
            <deleteButton :id="profecional._id" :type="'users/profecionals'" :name="profecional.name" />
        </section>
        <h1>{{ profecional.name }}</h1>
        <a-image :src="profecional.img" :alt="profecional.name"/>
    </div>
</template>
<script setup>
    import CreateSkincare from "./CreateSkincare.vue"
    import { ref } from "vue";

    const create = ref(false)

    const handlercreate = () =>{
        create.value = !create.value
    }
</script>

<template>
    <div>
        <button class=" border border-slate-400 rounded-2xl text-3xl px-2" @click="handlercreate">
            <span v-if="!create"> + </span> 
            <span v-else> x </span>
         </button>
        <CreateSkincare v-show="create"/>
    </div>
</template>
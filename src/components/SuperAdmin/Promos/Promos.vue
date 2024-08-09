<script setup>
import { ref } from 'vue';

import ViewPromos from "./ViewPromos.vue";
import CreatePromos from "./CreatePromos.vue";

const addPromo = ref(false);
</script>

<template>
        <div>
        <section class="flex justify-center md:justify-end  mt-4 md:mr-5">
            <button  @click="addPromo = !addPromo">
                <span v-if="!addPromo" class=" border border-titulos rounded-md px-4 py-2 text-buttons"> + Añadir promo</span>
                <span v-else class=" border border-red-500 rounded-md px-4 py-2 text-buttons hover:text-white hover:bg-red-500 "> Cancelar </span>
            </button>
        </section>
        <CreatePromos v-if="addPromo" @handleCreate="addPromo = !addPromo" />
        <ViewPromos/>
    </div>

</template>
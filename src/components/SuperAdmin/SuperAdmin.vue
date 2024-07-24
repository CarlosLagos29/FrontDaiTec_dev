<script setup> 
import navBarSuperAdmin from "./navBarSuperAdmin.vue";

import Oferts from "./Oferts/Oferts.vue";
import Services from "./Services/ServicesAdmin.vue";
import ProfecionalsDb from "./ProfecionalsDb/ProfecionalsDb.vue";
import Turns from "./Turns/Turns.vue"

import { useStore } from "vuex";

const store = useStore();


</script>


<template>
    <div class="flex mx-3 gap-6">
        <nav class="  border border-slate-400 p-1 rounded-3xl max-h-[444px]">
            <navBarSuperAdmin />
        </nav>
        <section>
           
            <Oferts v-if="store.state.currentDashboard  === 'Ofertas'"/>
            <Services v-if="store.state.currentDashboard  === 'Servicios'"/>
            <ProfecionalsDb v-if="store.state.currentDashboard  === 'Profecionales'"/>
            <Turns v-if="store.state.currentDashboard  === 'Turnos'"/>

        </section>
    </div>
</template>
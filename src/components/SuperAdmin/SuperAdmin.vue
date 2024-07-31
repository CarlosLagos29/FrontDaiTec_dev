<script setup> 
import navBarSuperAdmin from "./navBarSuperAdmin.vue";

import Promos from "./Promos/Promos.vue"
import Oferts from "./Oferts/Oferts.vue";
import Services from "./Services/ServicesAdmin.vue";
import ProfecionalsDb from "./ProfecionalsDb/ProfecionalsDb.vue";
import Turns from "./Turns/Turns.vue"

import { useStore } from "vuex";

const { dispatch, state }= useStore();


</script>


<template>
    <div class="flex mx-3 gap-6">
        <nav class=" border border-slate-400 rounded-3xl py-6 ">
            <navBarSuperAdmin />
        </nav>
        <section>
            
            <Promos v-if="state.currentDashboard  === 'Promos'"/>
            <Oferts v-if="state.currentDashboard  === 'Ofertas'"/>
            <Services v-if="state.currentDashboard  === 'Servicios'"/>
            <ProfecionalsDb v-if="state.currentDashboard  === 'Profecionales'"/>
            <Turns v-if="state.currentDashboard  === 'Turnos'"/>

        </section>
    </div>
</template>
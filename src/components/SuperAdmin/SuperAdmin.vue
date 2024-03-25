<script setup> 
import navBarSuperAdmin from "./navBarSuperAdmin.vue";
import Generals from "./Generals/Generals.vue";
import MakeUps from "./MakeUps/MakeUps.vue";
import Oferts from "./Oferts/Oferts.vue";
import Services from "./Services/Services.vue";
import SkinCaresDb from "./SkincaresDb/SkinCaresDb.vue";
import ProfecionalsDb from "./ProfecionalsDb/ProfecionalsDb.vue";
import Turns from "./Turns/Turns.vue"
import { useStore } from "vuex";

const store = useStore()
</script>


<template>
    <div class="flex items-center">
        <nav class=" flex justify-start border border-slate-400 p-2 rounded-3xl mr-3">
            <navBarSuperAdmin />
        </nav>
        <section>
            <Generals v-if="store.state.currentDashboard  === 'Productos Gennerales'"/>
            <MakeUps v-if="store.state.currentDashboard  === 'MakeUps'"/>
            <Oferts v-if="store.state.currentDashboard  === 'Ofertas'"/>
            <Services v-if="store.state.currentDashboard  === 'Servicios'"/>
            <SkinCaresDb v-if="store.state.currentDashboard  === 'Skincares'"/>
            <ProfecionalsDb v-if="store.state.currentDashboard  === 'Profecionales'"/>
            <Turns v-if="store.state.currentDashboard  === 'Turnos'"/>

        </section>
    </div>
</template>
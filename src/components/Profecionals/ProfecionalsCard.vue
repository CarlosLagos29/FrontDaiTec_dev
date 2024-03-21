<script setup>
    const props = defineProps({
        profecional: Object,
        order: Number,
    })
</script>

<template>
    <div class=" flex gap-6 justify-center items-center border-2 border-pink-300 p-6 max-w-[825px]" :class="{ ' flex flex-row-reverse': order % 2 !== 0 }">
        <section>
            <img class=" size-56" :src="profecional.img" :alt="profecional.name">
        </section>
        <section >
            <h1>{{ profecional.name }}</h1>
            <ul class="flex gap-1">Servicios:
                <li v-for="(service, index) in profecional.services" :key="index">
                    {{ service }}
                    <span v-if="index !== profecional.services.length - 1">/</span>
                </li>
            </ul>
            <p>{{ profecional.description }}</p>
        </section>
    </div>
</template>
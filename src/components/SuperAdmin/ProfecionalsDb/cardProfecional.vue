<script setup lang="ts">
import deleteButton from "../Reutilizables/Buttons/DeleteButton.vue";
import editButton from "../Reutilizables/Buttons/editButton.vue";
import type { Profecional } from "@/types";

defineProps<{
    profecional: Profecional;
}>();
</script>

<template>
    <div class="w-[50%]">
        <section class="flex items-center">
            <deleteButton
                :id="profecional._id"
                :type="'users/profecionals'"
                :name="profecional.name"
            />
            <editButton :id="profecional._id" :type="'users/profecionals'" />
        </section>
        <h1>{{ profecional.name }}</h1>
        <a-image :src="profecional.img" :alt="profecional.name" />
    </div>
</template>

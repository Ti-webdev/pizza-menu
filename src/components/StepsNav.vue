<script setup lang="ts">
import { STEPS_URL_PREFIX, STEPS } from '~/constants'
import { useChoiceQuery } from '~/logic'
const query = useChoiceQuery()
const prefix = STEPS_URL_PREFIX
</script>

<template>
  <ul class="flex border-b">
    <li v-for="step of STEPS" :key="step.slug" class="-mb-px mr-1">
      <router-link v-slot="{ href, navigate, isActive }" :to="{ path: `${prefix}${step.slug}`, query }" custom>
        <a :href="href" :class="isActive ? 'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue' : 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue'" @click="navigate">
          {{ step.title }}
        </a>
      </router-link>
    </li>
  </ul>
</template>

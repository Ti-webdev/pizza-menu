<script setup lang="ts">
import { SIZES } from '~/constants'
import { useNextStep, useSaveChoice, useSubmitChoice, useChoice } from '~/logic'
const nextStep = useNextStep()
const saveChoice = useSaveChoice()
const submitChoice = useSubmitChoice()
const selected = useChoice()
</script>

<template>
  <form action="nextStep" method="get" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitChoice(selected)">
    <div class="mb-4">
      <label v-for="size of SIZES" :key="size.slug">
        <input v-model="selected.size" :value="size.slug" name="size" type="radio" @input="saveChoice({ ...selected, size: size.slug })">
        {{ size.title }}
      </label>
    </div>
    <button class="btn" type="submit">
      Next &rarr;
    </button>
  </form>
</template>

<style scoped>
label { display: block; }
</style>

<route lang="yaml">
meta:
  layout: steps
</route>

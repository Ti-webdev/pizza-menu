<script setup lang="ts">
import { useChoice, useNextStep, useToppings, useSaveChoice, useSubmitChoice } from '~/logic'
const nextStep = useNextStep()
const selected = useChoice()
const { toppings, available } = useToppings()
const saveChoice = useSaveChoice()
const submitChoice = useSubmitChoice()
</script>

<template>
  <form action="nextStep" method="get" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitChoice(selected)">
    <div class="grid grid-cols-2 gap-x-2 gap-y-1 max-w-max items-baseline">
      <template v-for="topping of toppings" :key="topping.slug">
        <label :for="topping.slug" class="mb-1">
          {{ topping.title }}
        </label>
        <input
          :id="topping.slug"
          v-model="topping.value"
          type="number"
          min="0"
          :max="topping.value + available"
          :name="topping.slug"
          :disabled="topping.disabled || (available < 1 && topping.value < 1)"
          class="form-input px-2 py-1 rounded-full text-right w-14"
          :class="{'bg-gray-200 cursor-not-allowed': topping.disabled || (available < 1 && topping.value < 1)}"
          @input="saveChoice({ [topping.slug]: $event.target.value })"
        />
      </template>
    </div>
    <button class="btn" type="submit">
      Next &rarr;
    </button>
  </form>
</template>

<route lang="yaml">
meta:
  layout: steps
</route>

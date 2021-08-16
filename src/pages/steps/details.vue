<script setup lang="ts">
import { useChoice, useNextStep, useSaveChoice, useSubmitChoice } from '~/logic'
const nextStep = useNextStep()
const selected = useChoice()
const saveChoice = useSaveChoice()
const submitChoice = useSubmitChoice()
</script>

<template>
  <form action="nextStep" method="get" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitChoice(selected)">
    <div class="grid grid-cols-2 gap-x-2 gap-y-1 max-w-max items-baseline">
      <label for="fn" class="mb-1">
        Name
      </label>
      <input
        :value="selected.fn"
        type="text"
        name="fn"
        class="form-input px-2 py-1 rounded-full w-64"
        @input="saveChoice({ fn: $event.target.value })"
      />
      <label for="address" class="mb-1">
        Address
      </label>
      <input
        :value="selected.address"
        type="text"
        name="address"
        class="form-input px-2 py-1 rounded-full w-64"
        @input="saveChoice({ address: $event.target.value })"
      />
      <label for="tel" class="mb-1">
        Phone
      </label>
      <input
        :value="selected.tel"
        type="text"
        name="tel"
        class="form-input px-2 py-1 rounded-full w-64"
        @input="saveChoice({ tel: $event.target.value })"
      />
    </div>
    <button class="btn" type="submit">
      Order Pizza &rarr;
    </button>
  </form>
</template>

<route lang="yaml">
meta:
  layout: steps
</route>

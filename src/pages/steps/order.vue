<script setup lang="ts">
import { useChoice, useSize, useSelectedToppings, useCalculate } from '~/logic'
import { VAT } from '~/constants'
const selected = useChoice()
const size = useSize()
const toppings = useSelectedToppings()
const { summary, vat, total } = useCalculate()
const VAT_PERCENTS = VAT * 100
</script>

<template>
  <div v-if="size" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <table class="table">
      <tr>
        <th class="text-left px-2 py-1">
          Size:
        </th>
        <td class="text-right px-2 py-1">
          {{ size.title }}
        </td>
      </tr>

      <tr v-for="topping of toppings" :key="topping.slug">
        <th :for="topping.slug" class="px-2 py-1 text-left">
          {{ topping.title }}
        </th>
        <td class="text-right px-2 py-1">
          ✕{{ topping.value }}
        </td>
      </tr>

      <tr class="bg-green-100">
        <th class="text-left px-2 py-1">
          Summary:
        </th>
        <th class="text-right px-2 py-1">
          ${{ summary.toFixed(2) }}
        </th>
      </tr>
      <tr class="bg-green-100">
        <th class="text-left px-2 py-1">
          VAT {{ VAT_PERCENTS }}%:
        </th>
        <th class="text-right px-2 py-1">
          ${{ vat.toFixed(2) }}
        </th>
      </tr>
      <tr class="bg-green-100">
        <th class="text-left px-2 py-1">
          Total:
        </th>
        <th class="text-right px-2 py-1">
          ${{ total.toFixed(2) }}
        </th>
      </tr>
      <tfoot>
        <tr class="bg-yellow-100">
          <th class="text-left px-2 py-1">
            Name:
          </th>
          <td class="text-right px-2 py-1">
            {{ selected.fn }}
          </td>
        </tr>
        <tr class="bg-yellow-100">
          <th class="text-left px-2 py-1">
            Address:
          </th>
          <td class="text-right px-2 py-1">
            {{ selected.address }}
          </td>
        </tr>
        <tr class="bg-yellow-100">
          <th class="text-left px-2 py-1">
            Phone:
          </th>
          <td class="text-right px-2 py-1">
            {{ selected.tel }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div v-else class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <router-link :to="{ path: '/steps/size' }" class="btn">
      Select size
    </router-link>
  </div>
</template>

<style scoped>
label { display: block; }
</style>

<route lang="yaml">
meta:
  layout: empty
</route>

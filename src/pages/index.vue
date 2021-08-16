<script setup lang="ts">
import { useRouter } from 'vue-router'
import { STEPS } from '~/constants'
const router = useRouter()
router.replace(`/steps/${STEPS[0].slug}`)
</script>

<template>
  <div></div>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>

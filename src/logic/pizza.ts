import { computed, unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { LocationQueryRaw } from 'vue-router'
import {
  STEPS,
  STEPS_URL_PREFIX,
  STEPS_URL_ORDER,
  SIZES,
  TOPPINGS,
  TOPPINGS_LIMIT,
  TOPPING_CONFLICT,
  TOPPINGS_CHEAPEST_FREE_EVERY,
  VAT,
} from '~/constants'

type SelectedType = Record<string, string|number>

export const useChoice = () => {
  const route = useRoute()
  return computed(() => {
    const result: SelectedType = {}
    if (route.query.size) {
      const size = unref(route.query.size)
      if (SIZES.some(({ slug }) => slug === size)) result.size = size as string
    }
    for (const topping of TOPPINGS) {
      if (route.query[topping.slug]) result[topping.slug] = Math.max(0, parseInt(route.query[topping.slug] as string, 10))
      else result[topping.slug] = 0
    }
    for (const key of ['fn', 'address', 'tel']) {
      const value = route.query[key]
      if (typeof value === 'string') result[key] = value
    }
    return result
  })
}
export const useNextStep = () => {
  const route = useRoute()
  return computed(() => {
    const index = STEPS.findIndex(step => route.path === `${STEPS_URL_PREFIX}${step.slug}`)
    if (index === STEPS.length - 1) return STEPS_URL_ORDER
    const nextStep = STEPS[index + 1] || STEPS[0]
    return `${STEPS_URL_PREFIX}${nextStep.slug}`
  })
}

function getQuery(selected: SelectedType): LocationQueryRaw {
  const result: SelectedType = {}
  if (selected.size) {
    const size = unref(selected.size)
    if (SIZES.some(({ slug }) => slug === size)) result.size = size
  }

  for (const topping of TOPPINGS) {
    if (selected[topping.slug]) {
      const value = unref(selected[topping.slug])
      if (value > 0) result[topping.slug] = value
    }
  }
  for (const key of ['fn', 'address', 'tel']) {
    const value = selected[key]
    if (typeof value === 'string' && value.trim() !== '') result[key] = value.trim()
  }
  return result
}

export const useChoiceQuery = () => {
  const selected = useChoice()
  return computed(() => getQuery(selected.value))
}

export const useSaveChoice = () => {
  const router = useRouter()
  const route = useRoute()
  return async(selected: SelectedType) => {
    const query = getQuery({ ...route.query, ...selected } as SelectedType)
    await router.replace({ query })
    return query
  }
}
export const useSubmitChoice = () => {
  const router = useRouter()
  const nextStep = useNextStep()
  return async(selected: SelectedType) => {
    const query = getQuery(selected)
    await router.replace({ query })
    await router.push({ query, path: nextStep.value })
  }
}

export const useSize = () => {
  const selected = useChoice()
  return computed(() => SIZES.find(size => size.slug === selected.value.size))
}

export const useToppings = () => {
  const selected = useChoice()
  const toppings = computed(() => {
    const result = []
    let toppingsAdded = 0
    for (const topping of TOPPINGS) {
      let value = Math.max(0, selected.value[topping.slug] as number)
      value = Math.min(value, TOPPINGS_LIMIT - toppingsAdded)
      toppingsAdded += value
      let disabled = false
      if (TOPPING_CONFLICT.includes(topping.slug)) disabled = TOPPING_CONFLICT.some(slug => topping.slug !== slug && selected.value[slug])

      result.push({
        ...topping,
        value,
        disabled,
      })
    }
    return result
  })
  const available = computed(() => {
    let result = TOPPINGS_LIMIT
    for (const topping of toppings.value) result -= topping.value
    return result
  })

  return {
    toppings,
    available,
  }
}

export const useSelectedToppings = () => {
  const { toppings } = useToppings()

  return computed(() => toppings.value.filter(topping => topping.value > 0))
}

export const useCalculate = () => {
  const size = useSize()
  const toppings = useSelectedToppings()

  function getCalculatedToppingsPrice() {
    const prices: number[] = []
    for (const toping of toppings.value) {
      if (!toping.free && toping.value) {
        for (let i = 0; i < toping.value; i++)
          prices.push(toping.price as number)
      }
    }
    const free = Math.floor(prices.length / TOPPINGS_CHEAPEST_FREE_EVERY)
    if (free > 0) {
      prices.sort()
      prices.splice(0, free)
    }
    return prices.reduce((a, b) => a + b, 0)
  }
  const summary = computed(() => {
    return (size.value?.price || 0) + getCalculatedToppingsPrice()
  })

  const vat = computed(() => {
    return Math.round((VAT * summary.value + Number.EPSILON) * 100) / 100
  })
  const total = computed(() => {
    return summary.value + vat.value
  })

  return {
    summary,
    vat,
    total,
  }
}


export const STEPS_URL_PREFIX = '/steps/'
export const STEPS_URL_ORDER = `${STEPS_URL_PREFIX}order`

export const STEPS = [
  { slug: 'size', title: 'Size' },
  { slug: 'topping', title: 'Topping' },
  { slug: 'details', title: 'Details' },
]

export const SIZES = [
  { slug: 'S', title: 'Small', price: 5 },
  { slug: 'M', title: 'Medium', price: 10 },
  { slug: 'L', title: 'Large', price: 15 },
  { slug: 'XL', title: 'Extra large', price: 20 },
]

export const TOPPINGS = [
  { slug: 'mushrooms', title: 'Mushrooms', price: 1 },
  { slug: 'olives', title: 'Olives', price: 1 },
  { slug: 'tomato', title: 'Tomato', free: true },
  { slug: 'tona', title: 'Tona', price: 3 },
  { slug: 'pineapple', title: 'Pineapple', price: 3 },
  { slug: 'seafood', title: 'Seafood', price: 5 },
  { slug: 'pepperoni', title: 'Pepperoni', price: 2 },
  { slug: 'bacon', title: 'Bacon', price: 1 },
  { slug: 'onion', title: 'Onion', free: true },
  { slug: 'mozzarella', title: 'Mozzarella', price: 3 },
]

export const TOPPING_CONFLICT = ['bacon', 'mozzarella']
export const TOPPINGS_LIMIT = 6
export const TOPPINGS_CHEAPEST_FREE_EVERY = 3

export const VAT = 0.15

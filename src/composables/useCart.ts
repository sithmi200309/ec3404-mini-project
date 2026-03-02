import { ref, watch } from 'vue'
import type { Product } from '../types/product'

/* Load cart from sessionStorage */
const savedCart = sessionStorage.getItem('cart')

const cart = ref<Product[]>(
  savedCart ? JSON.parse(savedCart) : []
)

/* Add item */
const addToCart = (product: Product) => {
  const exists = cart.value.find(
    (item) => item.id === product.id
  )

  if (!exists) {
    cart.value.push(product)
  }
}

/* Remove item */
const removeFromCart = (id: number) => {
  cart.value = cart.value.filter(
    (item) => item.id !== id
  )
}

/* Save automatically */
watch(
  cart,
  (newCart) => {
    sessionStorage.setItem(
      'cart',
      JSON.stringify(newCart)
    )
  },
  { deep: true }
)

export function useCart() {
  return {
    cart,
    addToCart,
    removeFromCart
  }
}
import { ref, watch } from 'vue'
import type { Product } from '../types/product'

const cart = ref<Product[]>(JSON.parse(
  localStorage.getItem('cart') || '[]'
))

const addToCart = (product: Product) => {
  const exists = cart.value.find(
    (item) => item.id === product.id
  )

  if (!exists) {
    cart.value.push(product)
  }
}

const removeFromCart = (id: number) => {
  cart.value = cart.value.filter(
    (item) => item.id !== id
  )
}

/* Save automatically */
watch(
  cart,
  () => {
    localStorage.setItem(
      'cart',
      JSON.stringify(cart.value)
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
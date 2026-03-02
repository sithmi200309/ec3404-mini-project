<script setup lang="ts">
import type { Product } from '../types/product'
import { useCart } from '../composables/useCart'

defineProps<{
  product: Product | null
  show: boolean
}>()

const emit = defineEmits(['close'])

/* Cart */
const { addToCart } = useCart()
</script>

<template>
  <div
    v-if="show && product"
    @click.self="emit('close')"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-xl w-[400px] relative">

      <!-- Close Button -->
      <button
        class="absolute top-2 right-3 text-xl"
        @click="emit('close')"
      >
        ✖
      </button>

      <!-- Image -->
      <img
        :src="product.thumbnail"
        class="w-full h-48 object-cover rounded"
      />

      <!-- Title -->
      <h2 class="text-xl font-bold mt-3">
        {{ product.title }}
      </h2>

      <!-- Description -->
      <p class="text-gray-600 mt-2">
        {{ product.description }}
      </p>

      <!-- Price -->
      <p class="font-semibold mt-2">
        Price: ${{ product.price }}
      </p>

      <!-- Category -->
      <p class="text-sm text-gray-500">
        Category: {{ product.category }}
      </p>

      <!-- Add To Cart Button -->
      <button
        @click="addToCart(product)"
        class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>

    </div>
  </div>
</template>
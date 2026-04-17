<script setup lang="ts">
import type { Product } from '../types/product'

const props = defineProps<{
  product: Product
  isWishlisted: boolean
}>()

const emit = defineEmits(['select', 'add-to-cart', 'toggle-wishlist'])
</script>

<template>
  <div
    @click="emit('select', props.product)"
    class="relative bg-white rounded-xl shadow-md p-4 cursor-pointer
       hover:shadow-2xl hover:scale-105
       transition duration-300"
  >
    <!-- IMAGE -->
    <img
      :src="props.product.thumbnail"
      alt=""
      class="h-44 w-full object-cover rounded-lg"
    />
     <!-- WISHLIST BUTTON -->
    <button
  @click.stop="emit('toggle-wishlist', props.product.id)"
  class="absolute top-2 right-2 text-xl"
  :class="props.isWishlisted ? 'text-pink-600' : 'text-gray-400'"
>
  {{ props.isWishlisted ? '♥' : '♡' }}
</button>

    <!-- TITLE -->
    <h2 class="font-semibold mt-3 text-lg">
      {{ props.product.title }}
    </h2>

    <!-- PRICE -->
    <p class="text-gray-600 mt-1">
      ${{ props.product.price }}
    </p>

    <!-- RATING -->
    <div class="text-yellow-500 mt-1">
      <span v-for="i in 5" :key="i">
        {{ i <= Math.round(props.product.rating) ? '★' : '☆' }}
      </span>
      <span class="text-sm text-gray-500 ml-1">
        ({{ props.product.rating }})
      </span>
    </div>

    <!-- CATEGORY -->
    <p class="text-sm text-gray-400 capitalize">
      {{ props.product.category }}
    </p>

    <!-- ADD TO CART BUTTON -->
    <button
      @click.stop="emit('add-to-cart', props.product)"
      class="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
    >
      Add to Cart
    </button>
  </div>
</template>
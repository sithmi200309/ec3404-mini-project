<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product
}>()

const emit = defineEmits(['select'])
</script>

<template>
  <div
    @click="emit('select', product)"
    class="bg-white rounded-xl shadow-md p-4 cursor-pointer
           hover:shadow-2xl hover:scale-105
           transition duration-300"
  >
    <img
      :src="product.thumbnail"
      alt=""
      class="h-44 w-full object-cover rounded-lg"
    />

    <h2 class="font-semibold mt-3 text-lg">
      {{ product.title }}
    </h2>

    <p class="text-gray-600 mt-1">
      ${{ product.price }}
    </p>

    <p class="text-sm text-gray-400 capitalize">
      {{ product.category }}
    </p>
  </div>
</template>
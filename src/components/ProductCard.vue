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
    class="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition cursor-pointer"
  >
    <img
      :src="product.thumbnail"
      alt=""
      class="h-40 w-full object-cover rounded-lg"
    />
    <h2 class="font-semibold mt-2">{{ product.title }}</h2>
    <p class="text-sm text-gray-600">${{ product.price }}</p>
  </div>
</template>
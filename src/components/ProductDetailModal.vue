<script setup lang="ts">
import type { Product } from '../types/product'

defineProps<{
  product: Product | null
  show: boolean
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <div
    v-if="show && product"
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

      <img
        :src="product.thumbnail"
        class="w-full h-48 object-cover rounded"
      />

      <h2 class="text-xl font-bold mt-3">
        {{ product.title }}
      </h2>

      <p class="text-gray-600 mt-2">
        {{ product.description }}
      </p>

      <p class="font-semibold mt-2">
        Price: ${{ product.price }}
      </p>

      <p class="text-sm text-gray-500">
        Category: {{ product.category }}
      </p>

    </div>
  </div>
</template>
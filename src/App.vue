<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product, ProductResponse } from './types/product'

const products = ref<Product[]>([])
const loading = ref<boolean>(true)

const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data: ProductResponse = await response.json()
    products.value = data.products
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-center mb-8">
      EC3404 Mini Project - Product Store
    </h1>

    <div v-if="loading" class="text-center text-lg">
      Loading products...
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-xl shadow-md p-4"
      >
        <img
          :src="product.thumbnail"
          alt=""
          class="h-40 w-full object-cover rounded-lg"
        />
        <h2 class="font-semibold mt-2">{{ product.title }}</h2>
        <p class="text-sm text-gray-600">${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>
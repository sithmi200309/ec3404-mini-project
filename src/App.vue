<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product, ProductResponse } from './types/product'

import ProductCard from './components/ProductCard.vue'
import ProductDetailModal from './components/ProductDetailModal.vue'

const products = ref<Product[]>([])
const loading = ref<boolean>(true)
const searchQuery = ref<string>('')

const selectedProduct = ref<Product | null>(null)
const showModal = ref<boolean>(false)

const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data: ProductResponse = await response.json()
    products.value = data.products
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})

const openProduct = (product: Product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
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

    <!-- Search -->
    <div class="mb-6 flex justify-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full max-w-md p-2 border rounded-lg shadow-sm"
      />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-lg">
      Loading products...
    </div>

    <!-- Products -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @select="openProduct"
      />
    </div>

    <!-- Modal -->
    <ProductDetailModal
      :product="selectedProduct"
      :show="showModal"
      @close="closeModal"
    />

  </div>
</template>
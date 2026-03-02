<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product, ProductResponse } from './types/product'

import ProductCard from './components/ProductCard.vue'
import ProductDetailModal from './components/ProductDetailModal.vue'

const products = ref<Product[]>([])
const loading = ref<boolean>(true)
const searchQuery = ref<string>('')

/* Dark Mode */
const darkMode = ref<boolean>(false)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

/* Modal */
const selectedProduct = ref<Product | null>(null)
const showModal = ref<boolean>(false)

/* Fetch Products */
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

/* Search Filter */
const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})

/* Open Modal */
const openProduct = (product: Product) => {
  selectedProduct.value = product
  showModal.value = true
}

/* Close Modal */
const closeModal = () => {
  showModal.value = false
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div
    :class="
      darkMode
        ? 'min-h-screen p-8 bg-gray-900 text-white'
        : 'min-h-screen p-8 bg-gradient-to-br from-gray-100 to-gray-200'
    "
  >
    <!-- Title -->
    <h1 class="text-4xl font-bold text-center mb-6">
      Smart Product Explorer
    </h1>

    <!-- Dark Mode Button -->
    <div class="flex justify-center mb-6">
      <button
        @click="toggleDarkMode"
        class="px-4 py-2 bg-black text-white rounded-lg"
      >
        Toggle Dark Mode
      </button>
    </div>

    <!-- Search -->
    <div class="mb-6 flex justify-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full max-w-md p-2 border rounded-lg shadow-sm text-black"
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
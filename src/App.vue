<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product, ProductResponse } from './types/product'

import ProductCard from './components/ProductCard.vue'
import ProductDetailModal from './components/ProductDetailModal.vue'
import { useCart } from './composables/useCart'

/* CART */
const { cart } = useCart()

/* STATES */
const products = ref<Product[]>([])
const loading = ref(true)

const searchQuery = ref('')
const selectedCategory = ref('all')

/* DARK MODE */
const darkMode = ref(false)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

/* MODAL */
const selectedProduct = ref<Product | null>(null)
const showModal = ref(false)

/* FETCH PRODUCTS */
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

/* CATEGORY LIST */
const categories = computed(() => {
  const unique = new Set(
    products.value.map((p) => p.category)
  )
  return ['all', ...unique]
})

/* FILTER PRODUCTS */
const filteredProducts = computed(() => {
  return products.value.filter((product) => {

    const searchMatch =
      product.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())

    const categoryMatch =
      selectedCategory.value === 'all' ||
      product.category === selectedCategory.value

    return searchMatch && categoryMatch
  })
})

/* MODAL FUNCTIONS */
const openProduct = (product: Product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(fetchProducts)
</script>

<template>
  <div
    :class="
      darkMode
        ? 'min-h-screen bg-gray-900 text-white p-8'
        : 'min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8'
    "
  >

    <!-- HEADER -->
    <div class="relative flex items-center mb-6">

  <!-- CENTER TITLE -->
  <h1 class="text-4xl font-bold mx-auto">
    Smart Product Explorer
  </h1>

  <!-- CART RIGHT -->
  <div
    class="absolute right-0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
  >
    🛒 Cart: {{ cart.length }}
  </div>

</div>

    <!-- DARK MODE -->
    <div class="flex justify-center mb-6">
      <button
        @click="toggleDarkMode"
        class="px-4 py-2 bg-black text-white rounded-lg"
      >
        Dark Mode
      </button>
    </div>

    <!-- SEARCH -->
    <div class="flex justify-center mb-6">
      <input
        v-model="searchQuery"
        placeholder="Search products..."
        class="w-full max-w-md p-2 border rounded-lg text-black"
      />
    </div>

    <!-- CATEGORY FILTER -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        class="px-3 py-1 rounded border"
        :class="
          selectedCategory === category
            ? 'bg-blue-600 text-white'
            : 'bg-white text-black'
        "
      >
        {{ category }}
      </button>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center">
      Loading products...
    </div>

    <!-- PRODUCTS -->
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

    <!-- MODAL -->
    <ProductDetailModal
      :product="selectedProduct"
      :show="showModal"
      @close="closeModal"
    />

  </div>
</template>